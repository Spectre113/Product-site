import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

interface User {
  name: string;
  password: string;
}

export let users: User[] = [];

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const name: string = data.get("name") as string;
  const password: string = data.get("password") as string;
  console.log("name and password", name, password);
  let containsSameName: boolean = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].name == name) {
      containsSameName = true;
      console.log(users[i], name);
      break;
    }
  }

  if (name.length < 3 || password.length < 3) {
    return NextResponse.json({
      status: "fail",
      message: "Password or name is too short",
    });
  }

  if (containsSameName) {
    return NextResponse.json({
      status: "fail",
      message: "Account with this name already exists",
    });
  }
  users.push({ name, password });
  return NextResponse.json({ status: "ok", message: users });
}
