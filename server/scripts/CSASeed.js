import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import CSA from "../models/CSA.js";

dotenv.config({ path: "../.env" });
connectDB();

const nameToId = new Map([
    ["HP Service Centre Harsul", new mongoose.Types.ObjectId("69133185a961db76679c6023")],
    ["Hind Super", new mongoose.Types.ObjectId("69133185a961db76679c6031")],
    ["Narmada", new mongoose.Types.ObjectId("69133185a961db76679c6032")],
]);

const seedcsas = async () => {
    try {
        const rawData = {
            convertedCsas: [
                { name: "BABASAHEB KHARAT", outlet: nameToId.get('HP Service Centre Harsul'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "ABHIJIT WAHUL", outlet: nameToId.get('HP Service Centre Harsul'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "RAVI GAIKWAD", outlet: nameToId.get('HP Service Centre Harsul'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "GATKHANE", outlet: nameToId.get('HP Service Centre Harsul'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "SWAPNIL BANLODE", outlet: nameToId.get('HP Service Centre Harsul'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "PRIYANKA CHATE", outlet: nameToId.get('Hind Super'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "KAVITA SUGRANKAR", outlet: nameToId.get('Hind Super'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "IMRAN FARUKI", outlet: nameToId.get('Hind Super'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "SAYYED ABBAS", outlet: nameToId.get('Narmada'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "KAYYUM KHAN", outlet: nameToId.get('Narmada'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
                { name: "UIKEY GAWAL", outlet: nameToId.get('Narmada'), region: new mongoose.Types.ObjectId("68fb0216c81d0330c1f0b5e8"), district: "Aurangabad" },
            ]
        };

        // Clear existing outlets for this zone
        // await Outlet.deleteMany({ zone: AURANGABAAD_ZONE_ID });
        // console.log('Cleared existing outlets for Aurangabaad zone');

        // Insert new outlets
        const result = await CSA.insertMany(rawData.convertedCsas);
        console.log(`Successfully seeded ${result.length} CSAs for Aurangabaad zone`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding CSAs:', error);
        process.exit(1);
    }
};

seedcsas();