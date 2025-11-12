import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import PerformanceRecord from "../models/PerformanceRecord.js";

dotenv.config({ path: "../.env" });
connectDB();

const nameToCsaId = new Map([
    ["BABASAHEB KHARAT", new mongoose.Types.ObjectId("69137a58fc317010df3aeddc")],
    ["ABHIJIT WAHUL", new mongoose.Types.ObjectId("69137a58fc317010df3aeddd")],
    ["RAVI GAIKWAD", new mongoose.Types.ObjectId("69137a58fc317010df3aedde")],
    ["GATKHANE", new mongoose.Types.ObjectId("69137a58fc317010df3aeddf")],
    ["SWAPNIL BANLODE", new mongoose.Types.ObjectId("69137a58fc317010df3aede0")],
    ["PRIYANKA CHATE", new mongoose.Types.ObjectId("69137a58fc317010df3aede1")],
    ["KAVITA SUGRANKAR", new mongoose.Types.ObjectId("69137a58fc317010df3aede2")],
    ["IMRAN FARUKI", new mongoose.Types.ObjectId("69137a58fc317010df3aede3")],
    ["SAYYED ABBAS", new mongoose.Types.ObjectId("69137a58fc317010df3aede4")],
    ["KAYYUM KHAN", new mongoose.Types.ObjectId("69137a58fc317010df3aede5")],
    ["UIKEY GAWAL", new mongoose.Types.ObjectId("69137a58fc317010df3aede6")],
]);

// RO / outlet names in the provided csaData (note the comma in "HP Service Centre, Harsul")
const outletNameToId = new Map([
    ["HP Service Centre, Harsul", new mongoose.Types.ObjectId("69133185a961db76679c6023")],
    ["Hind Super", new mongoose.Types.ObjectId("69133185a961db76679c6031")],
    ["Narmada", new mongoose.Types.ObjectId("69133185a961db76679c6032")],
]);

const csaData = [
    {
        "Sl": 1,
        "CSA Name": "BABASAHEB KHARAT",
        "RO Name": "HP Service Centre, Harsul",
        "Volume of Normal Petrol sales (in litres)": 0,
        "Volume of Normal Diesel sales (in litres)": 0,
        "Volume of Premium Petrol sales (Power95) (in litres)": 412,
        "How many HP pay transactions done?": 5797,
        "Number of google reviews": 1,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 2,
        "CSA Name": "ABHIJIT WAHUL",
        "RO Name": "HP Service Centre, Harsul",
        "Volume of Normal Petrol sales (in litres)": 634,
        "Volume of Normal Diesel sales (in litres)": 0,
        "Volume of Premium Petrol sales (Power95) (in litres)": 119,
        "How many HP pay transactions done?": 3658,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 3,
        "CSA Name": "RAVI GAIKWAD",
        "RO Name": "HP Service Centre, Harsul",
        "Volume of Normal Petrol sales (in litres)": 814,
        "Volume of Normal Diesel sales (in litres)": 0,
        "Volume of Premium Petrol sales (Power95) (in litres)": 0,
        "How many HP pay transactions done?": 1425,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 4,
        "CSA Name": "GATKHANE",
        "RO Name": "HP Service Centre, Harsul",
        "Volume of Normal Petrol sales (in litres)": 1442,
        "Volume of Normal Diesel sales (in litres)": 2364,
        "Volume of Premium Petrol sales (Power95) (in litres)": 0,
        "How many HP pay transactions done?": 35978,
        "Number of google reviews": 1,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 5,
        "CSA Name": "SWAPNIL BANLODE",
        "RO Name": "HP Service Centre, Harsul",
        "Volume of Normal Petrol sales (in litres)": 414,
        "Volume of Normal Diesel sales (in litres)": 1000,
        "Volume of Premium Petrol sales (Power95) (in litres)": 0,
        "How many HP pay transactions done?": 1200,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 6,
        "CSA Name": "PRIYANKA CHATE",
        "RO Name": "Hind Super",
        "Volume of Normal Petrol sales (in litres)": 200,
        "Volume of Normal Diesel sales (in litres)": 1200,
        "Volume of Premium Petrol sales (Power95) (in litres)": 0,
        "How many HP pay transactions done?": 0,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 7,
        "CSA Name": "KAVITA SUGRANKAR",
        "RO Name": "Hind Super",
        "Volume of Normal Petrol sales (in litres)": 600,
        "Volume of Normal Diesel sales (in litres)": 0,
        "Volume of Premium Petrol sales (Power95) (in litres)": 150,
        "How many HP pay transactions done?": 250,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 8,
        "CSA Name": "IMRAN FARUKI",
        "RO Name": "Hind Super",
        "Volume of Normal Petrol sales (in litres)": 0,
        "Volume of Normal Diesel sales (in litres)": 2000,
        "Volume of Premium Petrol sales (Power95) (in litres)": 300,
        "How many HP pay transactions done?": 0,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 9,
        "CSA Name": "SAYYED ABBAS",
        "RO Name": "Narmada",
        "Volume of Normal Petrol sales (in litres)": 1120,
        "Volume of Normal Diesel sales (in litres)": 0,
        "Volume of Premium Petrol sales (Power95) (in litres)": 21,
        "How many HP pay transactions done?": 200,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 10,
        "CSA Name": "KAYYUM KHAN",
        "RO Name": "Narmada",
        "Volume of Normal Petrol sales (in litres)": 560,
        "Volume of Normal Diesel sales (in litres)": 0,
        "Volume of Premium Petrol sales (Power95) (in litres)": 45,
        "How many HP pay transactions done?": 0,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    },
    {
        "Sl": 11,
        "CSA Name": "UIKEY GAWAL",
        "RO Name": "Narmada",
        "Volume of Normal Petrol sales (in litres)": 712,
        "Volume of Normal Diesel sales (in litres)": 0,
        "Volume of Premium Petrol sales (Power95) (in litres)": 55,
        "How many HP pay transactions done?": 0,
        "Number of google reviews": 0,
        "Number of new customers onboarded": 0,
        "Number of complaints resolved": 0,
        "Quantity of Lube sales": 0,
        "Quantity of Additive sales": 0
    }
];

const mapRowToRecord = (row) => {
    const csaName = row["CSA Name"];
    const outletName = row["RO Name"];

    const csaId = nameToCsaId.get(csaName);
    const outletId = outletNameToId.get(outletName);

    if (!csaId) {
        console.warn(`Skipping row Sl ${row.Sl}: unknown CSA "${csaName}"`);
        return null;
    }
    if (!outletId) {
        console.warn(`Skipping row Sl ${row.Sl}: unknown Outlet "${outletName}"`);
        return null;
    }

    return {
        csa: csaId,
        outlet: outletId,
        uploadType: "preTraining",
        uploadDate: new Date(),
        metrics: {
            normalPetrol: Number(row["Volume of Normal Petrol sales (in litres)"]) || 0,
            normalDiesel: Number(row["Volume of Normal Diesel sales (in litres)"]) || 0,
            premiumPetrol: Number(row["Volume of Premium Petrol sales (Power95) (in litres)"]) || 0,
            hpPay: Number(row["How many HP pay transactions done?"]) || 0,
            googleReviews: Number(row["Number of google reviews"]) || 0,
            newCustomers: Number(row["Number of new customers onboarded"]) || 0,
            complaintsResolved: Number(row["Number of complaints resolved"]) || 0,
            lubeSales: Number(row["Quantity of Lube sales"]) || 0,
            additiveSales: Number(row["Quantity of Additive sales"]) || 0,
        },
    };
};

const seed = async () => {
    try {
        const records = csaData
            .map(mapRowToRecord)
            .filter(Boolean);

        if (!records.length) {
            console.log("No valid records to insert.");
            process.exit(0);
        }

        const inserted = await PerformanceRecord.insertMany(records);
        console.log(`Inserted ${inserted.length} preTraining performance records.`);
        process.exit(0);
    } catch (err) {
        console.error("Error seeding performance records:", err);
        process.exit(1);
    }
};

seed();