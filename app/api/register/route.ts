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
    console.log(name, password, 'fdsfsdf')
    let containsSameName: boolean = false
    products.forEach(x => {
        if (x.name == name) {
            containsSameName = true
        }
    })

    if (containsSameName) {
        return NextResponse.json({ status: 'fail', message: 'Account with this name already exists' })
    }
    products.push({ name, password })
    save(products)
    return NextResponse.json({ status: 'ok', message: products })
}