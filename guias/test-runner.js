import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock n8n environment
const createMockContext = (inputJson, otherNodes = {}) => {
    return {
        $input: {
            first: () => ({ json: inputJson }),
            all: () => [{ json: inputJson }],
            item: { json: inputJson }
        },
        $: (nodeName) => {
            // Basic mock for accessing other nodes
            if (otherNodes[nodeName]) {
                return {
                    first: () => ({ json: otherNodes[nodeName] }),
                    item: { json: otherNodes[nodeName] }
                };
            }
            return { first: () => null }; // Node not found
        },
        console: console // Pass through console
    };
};

function runScript(scriptPath, context) {
    console.log(`\n--- Running ${path.basename(scriptPath)} ---`);
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    // Wrap in a function to allow 'return'
    // n8n scripts are function bodies
    // We use a temporary function wrapper string, but for execution we use the Function constructor

    try {
        // Warning: using eval/Function for testing only
        const run = new Function('$input', '$', scriptContent);
        return run(context.$input, context.$);
    } catch (e) {
        console.error("Execution Error:", e);
        return null;
    }
}

// === TEST CASES FOR processar-disponibilidade-debug.js ===
const disponibPath = path.join(__dirname, 'processar-disponibilidade-debug.js');

const testCasesDisponib = [
    {
        name: "Success - Object Input",
        input: {
            output: {
                available: true,
                suggestedTimes: ["2026-01-30T10:00:00"],
                message: "Sim, temos."
            }
        }
    },
    {
        name: "Success - String JSON Input",
        input: {
            output: '```json\n{"available": false, "message": "Sem vaga", "suggestedTimes": []}\n```'
        }
    },
    {
        name: "Fallback - Empty/Invalid",
        input: { output: null }
    }
];

// Run disponib tests
if (fs.existsSync(disponibPath)) {
    testCasesDisponib.forEach(tc => {
        console.log(`\nCase: ${tc.name}`);
        const result = runScript(disponibPath, createMockContext(tc.input));
        if (result) {
            console.log("Result:", JSON.stringify(result.json, null, 2));
        }
    });
} else {
    console.error(`File not found: ${disponibPath}`);
}


// === TEST CASES FOR processar-booking-ref.js ===
const bookingPath = path.join(__dirname, 'processar-booking-ref.js');

const testCasesBooking = [
    {
        name: "Booking - Direct Input",
        input: {
            output: {
                customerName: "Maria",
                serviceType: "Consulta",
                interpretedDate: "2026-02-01T14:30:00"
            }
        }
    },
    {
        name: "Booking - Fallback Input (Root)",
        input: {
            customerName: "João",
            serviceType: "Retorno",
            interpretedDate: "2026-02-02T09:00:00"
        }
    }
];

// Run booking tests
if (fs.existsSync(bookingPath)) {
    testCasesBooking.forEach(tc => {
        console.log(`\nCase: ${tc.name}`);
        const result = runScript(bookingPath, createMockContext(tc.input));
        if (result) {
            console.log("Result:", JSON.stringify(result.json, null, 2));
        }
    });
} else {
    console.error(`File not found: ${bookingPath}`);
}
