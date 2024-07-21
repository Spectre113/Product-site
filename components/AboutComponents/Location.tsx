import React, { useEffect } from "react";

const Location: React.FC = () => {
  useEffect(() => {
    const loadYandexMaps = () => {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.type = "text/javascript";
      script.onload = () => {
        if (window.ymaps) {
          window.ymaps.ready(init);
        }
      };
      document.head.appendChild(script);
    };

    loadYandexMaps();

    function init() {
      // Создание карты.
      var myMap = new window.ymaps.Map("map", {
        // Координаты центра карты.
        center: [55.748998136205635, 48.742352729530246],
        // Уровень масштабирования. Допустимые значения:
        zoom: 17,
      });
      var myPlacemark = new window.ymaps.Placemark([
        55.748998136205635, 48.742352729530246,
      ]);

      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myPlacemark);
    }
  }, []);

  return (
    <div id="map" style={{ width: "100%", height: "400px" }}>
      {}
    </div>
  );
};

export default Location;
