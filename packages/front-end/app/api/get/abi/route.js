import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { chainId, address } = body;

    const fs = require("fs");
    const dbPath = "./eth-database.json";
    let db = {};
    const data = fs.readFileSync(dbPath, "utf8");
    db = JSON.parse(data);

    return NextResponse.json(
      {abi: db[chainId][address]},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while fetching abi", error: error.message },
      { status: 500 }
    );
  }
}
