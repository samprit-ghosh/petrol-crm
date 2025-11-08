import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";

dotenv.config({ path: "../.env" });
connectDB();

const seedOutlets = async () => {
    try {
        const NAGPUR_ZONE_ID = new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e7");

        const rawData = {
            outlets: [
                {
                    "region": "NAGPUR",
                    "sapCode": "41040486",
                    "name": "S R YAWALE PETROLEUM",
                    "location": "Dapori, Amravati, 444905",
                    "district": "AMRAVATI",
                    "dealer": {
                        "name": "SHUBHAM YAWALE",
                        "mobile": "9403200032",
                        "email": "sryawale.hpcl@gmail.com"
                    },
                    "roManager": {
                        "name": "Vaibhav Mankar",
                        "mobile": "9503147244",
                        "email": ""
                    },
                    "saName": "Amravati",
                    "salesOfficer": {
                        "name": "Ankit Patel",
                        "mobile": "9589257260",
                        "email": ""
                    },
                    "noOfCSAs": 0,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 0,
                    "nearbyOutlets": []
                },
                {
                    "region": "NAGPUR",
                    "sapCode": "41055975",
                    "name": "THE BEST PETROL PUMP",
                    "location": "Morshi, Amravati, 444905",
                    "district": "AMRAVATI",
                    "dealer": {
                        "name": "NAVIN PETHE",
                        "mobile": "9326222202",
                        "email": "navinpethe@gmail.com"
                    },
                    "roManager": {
                        "name": "Jitesh Fande",
                        "mobile": "9764254599",
                        "email": ""
                    },
                    "saName": "Amravati",
                    "salesOfficer": {
                        "name": "Ankit Patel",
                        "mobile": "9589257260",
                        "email": ""
                    },
                    "noOfCSAs": 0,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 0,
                    "nearbyOutlets": []
                },
                {
                    "region": "NAGPUR",
                    "sapCode": "41034675",
                    "name": "HP AUTO CARE CHICHBHAWAN COCO",
                    "location": "Khasra No-157/2, Near Narayana School Mouza Chinchbhavan, Khapri Nagpur Chandrapur Road, NAGPUR-441108",
                    "district": "NAGPUR",
                    "dealer": {
                        "name": "PANKAJ YADAV",
                        "mobile": "8421421474",
                        "email": "41034675@RETAIL.HPCL.CO.IN"
                    },
                    "roManager": {
                        "name": "SHAILENDRA",
                        "mobile": "9795137727",
                        "email": "41034675@RETAIL.HPCL.CO.IN"
                    },
                    "saName": "NAGPUR-2",
                    "salesOfficer": {
                        "name": "AVITABH BHUTE",
                        "mobile": "9328315815",
                        "email": ""
                    },
                    "noOfCSAs": 0,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 0,
                    "nearbyOutlets": []
                },
                {
                    "region": "NAGPUR",
                    "sapCode": "41046086",
                    "name": "MSHSD VERMA FILLING STATION",
                    "location": "HP PETROL PUMP SURVEY NO. 26/2, WADI TO MANKAPUR CHOWK NEAR CENTRE POINT SCHOOL, DABHA, NAGPUR-440007",
                    "district": "NAGPUR",
                    "dealer": {
                        "name": "ASHOK VERMA",
                        "mobile": "9423054524",
                        "email": "41046086@RETAIL.HPCL.CO.IN"
                    },
                    "roManager": {
                        "name": "ASHOK VERMA",
                        "mobile": "9423054524",
                        "email": "41046086@RETAIL.HPCL.CO.IN"
                    },
                    "saName": "NAGPUR-2",
                    "salesOfficer": {
                        "name": "AVITABH BHUTE",
                        "mobile": "9328315815",
                        "email": ""
                    },
                    "noOfCSAs": 0,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 0,
                    "nearbyOutlets": []
                }
            ]
        };

        // ✅ Transform to match Outlet schema
        const outlets = rawData.outlets.map((o) => ({
            name: o.name.trim(),
            code: o.sapCode,
            zone: o.region === "NAGPUR" ? NAGPUR_ZONE_ID : null,
            address: o.location,
            footfallType: "urban",
            meta: {
                region: o.region,
                district: o.district,
                dealer: {
                    name: o.dealer?.name || "",
                    contact: o.dealer?.mobile || "",
                    email: o.dealer?.email || "",
                },
                roManager: {
                    name: o.roManager?.name || "",
                    email: o.roManager?.email || "",
                },
                sa: o.saName,
                so: {
                    name: o.salesOfficer?.name || "",
                    phone: o.salesOfficer?.mobile || "",
                    email: o.salesOfficer?.email || "",
                },
                facilities: {
                    noOfCSA: o.noOfCSAs,
                    hasSittingSpace: o.sittingSpaceAvailable,
                    hasIslandSpace: o.islandSpaceAvailable,
                    standingCapacity: o.standingCapacity,
                },
                nearbyOutlets: o.nearbyOutlets || [],
            },
        }));

        // await Outlet.deleteMany({});
        // console.log("🧹 Existing outlets cleared.");

        const created = await Outlet.insertMany(outlets);
        console.log(`✅ ${created.length} outlets added successfully!`);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding outlets:", err.message);
        process.exit(1);
    }
};

seedOutlets();
