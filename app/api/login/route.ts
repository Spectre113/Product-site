import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import { users } from "../register/route";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const name: string = data.get("name") as string;
  const password: string = data.get("password") as string;
  console.log("name and password", name, password);
  let containsSameName: boolean = false;
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].name == name) {
      if (users[i].password == password) containsSameName = true;
      else containsSameName = false;
      break;
    }
  }
  if (containsSameName) {
    return NextResponse.json({ status: "ok" });
  }
  return NextResponse.json({ status: "fail" });
}
