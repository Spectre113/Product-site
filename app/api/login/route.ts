import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server';
import { use } from 'react';

interface User {
    name: string,
    password: string
}

function save(users: User[]) {
    // Convert JSON object to string
    const jsonString = JSON.stringify(users, null, 4);

    // Write JSON string to a file
    fs.writeFileSync('users.json', jsonString)
}

function load() {
    // Read JSON file
    let users: User[] = []
    if (!fs.existsSync('users.json')) save(users)
    const data = fs.readFileSync('users.json', 'utf8')
    try {
        const jsonObject = JSON.parse(data);
        users = jsonObject
        console.log('JSON object:', jsonObject);
    } catch (err) {
        console.error('Error parsing JSON string:', err);
    }
    return users
}

export async function POST(request: NextRequest) {
    const products = load()
    const data = await request.formData()
    const name: string = data.get('name') as string
    const password: string = data.get('password') as string
    console.log('name and password', name, password)
    let containsSameName: boolean = false
    console.log(products)
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == name) {
            if (products[i].password == password) containsSameName = true;
            else containsSameName = false;
            break;
        }
    }
    if (containsSameName) {
        return NextResponse.json({ status: 'ok'})
    }
    return NextResponse.json({ status: 'fail' })
}