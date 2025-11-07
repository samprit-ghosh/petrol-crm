import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";

dotenv.config({ path: "../.env" });
connectDB();

const seedOutlets = async () => {
    try {
        const AURANGABAAD_ZONE_ID = new mongoose.Types.ObjectId("68fba5ead9e945db0dc2f7bf");

        const rawData = {
            outlets: [
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41051234",
                    "name": "M/S AURANGABAD HIGHWAY SERVICES",
                    "location": "NH-52, Near MIDC, Aurangabad, Maharashtra - 431001",
                    "district": "Aurangabad",
                    "dealer": {
                        "name": "Rajesh Kumar Sharma",
                        "mobile": "9876543210",
                        "email": "rajesh.sharma@aurangabadhighway.com"
                    },
                    "roManager": {
                        "name": "Anil Patil",
                        "mobile": "8765432109",
                        "email": "anil.patil@hpcl.in"
                    },
                    "saName": "Aurangabad Retail S.A.",
                    "salesOfficer": {
                        "name": "Sandeep Deshmukh",
                        "mobile": "7654321098",
                        "email": "sandeep.deshmukh@hpcl.in"
                    },
                    "noOfCSAs": 25,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 30,
                    "nearbyOutlets": ["M/S ELLORA PETROLEUM", "M/S AJANTA FUEL STATION"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41052345",
                    "name": "M/S ELLORA PETROLEUM",
                    "location": "Ellora Road, Khuldabad, Aurangabad, Maharashtra - 431002",
                    "district": "Aurangabad",
                    "dealer": {
                        "name": "Priya Singh",
                        "mobile": "9123456789",
                        "email": "priya.singh@ellorapetroleum.com"
                    },
                    "roManager": {
                        "name": "Vikram Jadhav",
                        "mobile": "8234567890",
                        "email": "vikram.jadhav@hpcl.in"
                    },
                    "saName": "Aurangabad Retail S.A.",
                    "salesOfficer": {
                        "name": "Sandeep Deshmukh",
                        "mobile": "7654321098",
                        "email": "sandeep.deshmukh@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["M/S AURANGABAD HIGHWAY SERVICES", "M/S DAULTABAD FUEL POINT"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41053456",
                    "name": "M/S AJANTA FUEL STATION",
                    "location": "Jalna Road, Near Ajanta Caves, Aurangabad, Maharashtra - 431003",
                    "district": "Aurangabad",
                    "dealer": {
                        "name": "Amit Verma",
                        "mobile": "9345678901",
                        "email": "amit.verma@ajantafuel.com"
                    },
                    "roManager": {
                        "name": "Sanjay More",
                        "mobile": "8456789012",
                        "email": "sanjay.more@hpcl.in"
                    },
                    "saName": "Aurangabad Retail S.A.",
                    "salesOfficer": {
                        "name": "Sandeep Deshmukh",
                        "mobile": "7654321098",
                        "email": "sandeep.deshmukh@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S AURANGABAD HIGHWAY SERVICES"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41054567",
                    "name": "M/S DAULTABAD FUEL POINT",
                    "location": "Daulatabad Fort Road, Aurangabad, Maharashtra - 431004",
                    "district": "Aurangabad",
                    "dealer": {
                        "name": "Sunil Gawande",
                        "mobile": "9456789012",
                        "email": "sunil.gawande@daulatabadfuel.com"
                    },
                    "roManager": {
                        "name": "Rahul Kulkarni",
                        "mobile": "8567890123",
                        "email": "rahul.kulkarni@hpcl.in"
                    },
                    "saName": "Aurangabad Retail S.A.",
                    "salesOfficer": {
                        "name": "Sandeep Deshmukh",
                        "mobile": "7654321098",
                        "email": "sandeep.deshmukh@hpcl.in"
                    },
                    "noOfCSAs": 12,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 12,
                    "nearbyOutlets": ["M/S ELLORA PETROLEUM"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41055678",
                    "name": "M/S JALNA HIGHWAY CENTRE",
                    "location": "Mumbai-Aurangabad Highway, Jalna, Maharashtra - 431203",
                    "district": "Jalna",
                    "dealer": {
                        "name": "Nitin Reddy",
                        "mobile": "9567890123",
                        "email": "nitin.reddy@jalnahighway.com"
                    },
                    "roManager": {
                        "name": "Mahesh Pawar",
                        "mobile": "8678901234",
                        "email": "mahesh.pawar@hpcl.in"
                    },
                    "saName": "Jalna Retail S.A.",
                    "salesOfficer": {
                        "name": "Rohit Jadhav",
                        "mobile": "7789012345",
                        "email": "rohit.jadhav@hpcl.in"
                    },
                    "noOfCSAs": 20,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["M/S AMBAD PETROLEUM", "M/S JAFRABAD FUEL STATION"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41056789",
                    "name": "M/S AMBAD PETROLEUM",
                    "location": "Ambad Industrial Area, Jalna, Maharashtra - 431204",
                    "district": "Jalna",
                    "dealer": {
                        "name": "Sneha Deshpande",
                        "mobile": "9678901234",
                        "email": "sneha.deshpande@ambadpetroleum.com"
                    },
                    "roManager": {
                        "name": "Prakash Nair",
                        "mobile": "8789012345",
                        "email": "prakash.nair@hpcl.in"
                    },
                    "saName": "Jalna Retail S.A.",
                    "salesOfficer": {
                        "name": "Rohit Jadhav",
                        "mobile": "7789012345",
                        "email": "rohit.jadhav@hpcl.in"
                    },
                    "noOfCSAs": 16,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 18,
                    "nearbyOutlets": ["M/S JALNA HIGHWAY CENTRE"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41057890",
                    "name": "M/S JAFRABAD FUEL STATION",
                    "location": "Jafrabad Road, Jalna, Maharashtra - 431205",
                    "district": "Jalna",
                    "dealer": {
                        "name": "Arun Tiwari",
                        "mobile": "9789012345",
                        "email": "arun.tiwari@jafrabadfuel.com"
                    },
                    "roManager": {
                        "name": "Vishal Rao",
                        "mobile": "8890123456",
                        "email": "vishal.rao@hpcl.in"
                    },
                    "saName": "Jalna Retail S.A.",
                    "salesOfficer": {
                        "name": "Rohit Jadhav",
                        "mobile": "7789012345",
                        "email": "rohit.jadhav@hpcl.in"
                    },
                    "noOfCSAs": 14,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S JALNA HIGHWAY CENTRE"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41058901",
                    "name": "M/S BEED CITY PETROLEUM",
                    "location": "Beed City Center, Beed, Maharashtra - 431122",
                    "district": "Beed",
                    "dealer": {
                        "name": "Ramesh Chavan",
                        "mobile": "9890123456",
                        "email": "ramesh.chavan@beedcitypetro.com"
                    },
                    "roManager": {
                        "name": "Suresh Kamble",
                        "mobile": "8901234567",
                        "email": "suresh.kamble@hpcl.in"
                    },
                    "saName": "Beed Retail S.A.",
                    "salesOfficer": {
                        "name": "Anjali Patil",
                        "mobile": "7901234567",
                        "email": "anjali.patil@hpcl.in"
                    },
                    "noOfCSAs": 22,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 25,
                    "nearbyOutlets": ["M/S BEED HIGHWAY SERVICES", "M/S PARLI PETROLEUM"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41059012",
                    "name": "M/S BEED HIGHWAY SERVICES",
                    "location": "Pune-Hyderabad Highway, Beed, Maharashtra - 431123",
                    "district": "Beed",
                    "dealer": {
                        "name": "Kavita Joshi",
                        "mobile": "9901234567",
                        "email": "kavita.joshi@beedhighway.com"
                    },
                    "roManager": {
                        "name": "Nilesh Desai",
                        "mobile": "9012345678",
                        "email": "nilesh.desai@hpcl.in"
                    },
                    "saName": "Beed Retail S.A.",
                    "salesOfficer": {
                        "name": "Anjali Patil",
                        "mobile": "7901234567",
                        "email": "anjali.patil@hpcl.in"
                    },
                    "noOfCSAs": 18,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 20,
                    "nearbyOutlets": ["M/S BEED CITY PETROLEUM"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41060123",
                    "name": "M/S PARLI PETROLEUM",
                    "location": "Parli Vaijnath Road, Beed, Maharashtra - 431124",
                    "district": "Beed",
                    "dealer": {
                        "name": "Deepak Mishra",
                        "mobile": "9012345678",
                        "email": "deepak.mishra@parlipetro.com"
                    },
                    "roManager": {
                        "name": "Ajay Thakur",
                        "mobile": "9123456789",
                        "email": "ajay.thakur@hpcl.in"
                    },
                    "saName": "Beed Retail S.A.",
                    "salesOfficer": {
                        "name": "Anjali Patil",
                        "mobile": "7901234567",
                        "email": "anjali.patil@hpcl.in"
                    },
                    "noOfCSAs": 15,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S BEED CITY PETROLEUM"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41061234",
                    "name": "M/S OSMANABAD FUEL CENTRE",
                    "location": "Osmanabad City, Osmanabad, Maharashtra - 413501",
                    "district": "Osmanabad",
                    "dealer": {
                        "name": "Meera Iyer",
                        "mobile": "9123456780",
                        "email": "meera.iyer@osmanabadfuel.com"
                    },
                    "roManager": {
                        "name": "Rajiv Menon",
                        "mobile": "9234567890",
                        "email": "rajiv.menon@hpcl.in"
                    },
                    "saName": "Osmanabad Retail S.A.",
                    "salesOfficer": {
                        "name": "Vikram Singh",
                        "mobile": "8345678901",
                        "email": "vikram.singh@hpcl.in"
                    },
                    "noOfCSAs": 20,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 22,
                    "nearbyOutlets": ["M/S TULJAPUR PETROLEUM", "M/S UMARGA FUEL STATION"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41062345",
                    "name": "M/S TULJAPUR PETROLEUM",
                    "location": "Tuljapur Road, Osmanabad, Maharashtra - 413502",
                    "district": "Osmanabad",
                    "dealer": {
                        "name": "Anand Kumar",
                        "mobile": "9234567891",
                        "email": "anand.kumar@tuljapuroil.com"
                    },
                    "roManager": {
                        "name": "Sachin Bansal",
                        "mobile": "9345678901",
                        "email": "sachin.bansal@hpcl.in"
                    },
                    "saName": "Osmanabad Retail S.A.",
                    "salesOfficer": {
                        "name": "Vikram Singh",
                        "mobile": "8345678901",
                        "email": "vikram.singh@hpcl.in"
                    },
                    "noOfCSAs": 16,
                    "sittingSpaceAvailable": false,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 18,
                    "nearbyOutlets": ["M/S OSMANABAD FUEL CENTRE"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41063456",
                    "name": "M/S UMARGA FUEL STATION",
                    "location": "Umarga City, Osmanabad, Maharashtra - 413503",
                    "district": "Osmanabad",
                    "dealer": {
                        "name": "Priyanka Sharma",
                        "mobile": "9345678902",
                        "email": "priyanka.sharma@umargafuel.com"
                    },
                    "roManager": {
                        "name": "Amitabh Verma",
                        "mobile": "9456789012",
                        "email": "amitabh.verma@hpcl.in"
                    },
                    "saName": "Osmanabad Retail S.A.",
                    "salesOfficer": {
                        "name": "Vikram Singh",
                        "mobile": "8345678901",
                        "email": "vikram.singh@hpcl.in"
                    },
                    "noOfCSAs": 14,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": false,
                    "standingCapacity": 15,
                    "nearbyOutlets": ["M/S OSMANABAD FUEL CENTRE"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41064567",
                    "name": "M/S LATUR HIGHWAY SERVICES",
                    "location": "Latur-Hyderabad Highway, Latur, Maharashtra - 413512",
                    "district": "Latur",
                    "dealer": {
                        "name": "Rahul Mehta",
                        "mobile": "9456789013",
                        "email": "rahul.mehta@laturhighway.com"
                    },
                    "roManager": {
                        "name": "Sanjay Kapoor",
                        "mobile": "9567890123",
                        "email": "sanjay.kapoor@hpcl.in"
                    },
                    "saName": "Latur Retail S.A.",
                    "salesOfficer": {
                        "name": "Neha Reddy",
                        "mobile": "8678901234",
                        "email": "neha.reddy@hpcl.in"
                    },
                    "noOfCSAs": 24,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 28,
                    "nearbyOutlets": ["M/S LATUR CITY PETROLEUM", "M/S NILANGA FUEL POINT"]
                },
                {
                    "region": "AURANGABAD ZONE",
                    "sapCode": "41065678",
                    "name": "M/S LATUR CITY PETROLEUM",
                    "location": "Latur City Center, Latur, Maharashtra - 413513",
                    "district": "Latur",
                    "dealer": {
                        "name": "Sonia Gupta",
                        "mobile": "9567890124",
                        "email": "sonia.gupta@laturcitypetro.com"
                    },
                    "roManager": {
                        "name": "Vikas Malhotra",
                        "mobile": "9678901234",
                        "email": "vikas.malhotra@hpcl.in"
                    },
                    "saName": "Latur Retail S.A.",
                    "salesOfficer": {
                        "name": "Neha Reddy",
                        "mobile": "8678901234",
                        "email": "neha.reddy@hpcl.in"
                    },
                    "noOfCSAs": 19,
                    "sittingSpaceAvailable": true,
                    "islandSpaceAvailable": true,
                    "standingCapacity": 22,
                    "nearbyOutlets": ["M/S LATUR HIGHWAY SERVICES"]
                }
            ]
        };

        // ✅ Transform to match Outlet schema
        const outlets = rawData.outlets.map((o) => ({
            name: o.name.trim(),
            code: o.sapCode,
            zone: o.region === "AURANGABAD ZONE" ? AURANGABAAD_ZONE_ID : null,
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
