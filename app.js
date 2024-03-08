const express = require('express');
const cors = require('cors');
const app = express();
const puppeteer = require('puppeteer');
app.use(express.static('public'));
app.use(cors());
app.set('view engine', 'ejs');

var users = [
    { name: 'John Doe', email: 'john@example.com', age: 30 },
    { name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { name: 'Alice Johnson', email: 'alice@example.com', age: 35 },
    { name: 'Michael Brown', email: 'michael@example.com', age: 28 },
    { name: 'Emily Wilson', email: 'emily@example.com', age: 40 },
    { name: 'David Martinez', email: 'david@example.com', age: 22 },
    { name: 'Jennifer Taylor', email: 'jennifer@example.com', age: 33 },
    { name: 'Christopher Lee', email: 'christopher@example.com', age: 27 },
    { name: 'Jessica White', email: 'jessica@example.com', age: 29 },
    { name: "Matthew Johnson", email: "matthew@example.com", "age": 31 },
    { name: "Sophia Anderson", email: "sophia@example.com", "age": 26 },
    { name: "Daniel Harris", email: "daniel@example.com", "age": 34 },
    { name: "Olivia Thompson", email: "olivia@example.com", "age": 23 },
    { name: "Ethan Clark", email: "ethan@example.com", "age": 37 },
    { name: "Ava Martinez", email: "ava@example.com", "age": 32 },
    { name: "Alexander Baker", email: "alexander@example.com", "age": 24 },
    { name: "Isabella King", email: "isabella@example.com", "age": 39 },
    { name: "William Garcia", email: "william@example.com", "age": 28 },
    { name: "Mia Thomas", email: "mia@example.com", "age": 36 },
    { name: "Liam Wilson", email: "liam@example.com", "age": 29 },
    { name: "Charlotte Rodriguez", email: "charlotte@example.com", "age": 31 },
    { name: "Noah Lopez", email: "noah@example.com", "age": 27 },
    { name: "Amelia Nguyen", email: "amelia@example.com", "age": 33 },
    { name: "James Kim", email: "james@example.com", "age": 25 },
    { name: "Evelyn Hall", email: "evelyn@example.com", "age": 35 },
    { name: "Benjamin Gomez", email: "benjamin@example.com", "age": 30 },
    { name: "Abigail Carter", email: "abigail@example.com", "age": 26 },
    { name: "Michael Wright", email: "michaelw@example.com", "age": 32 },
    { name: "Elizabeth Hill", email: "elizabeth@example.com", "age": 28 },
    { name: "Lucas Adams", email: "lucas@example.com", "age": 24 },
    { name: "Chloe Scott", email: "chloe@example.com", "age": 30 },
    { name: "Logan Hernandez", email: "logan@example.com", "age": 28 },
    { name: "Zoe Ramirez", email: "zoe@example.com", "age": 32 },
    { name: "Mason Torres", email: "mason@example.com", "age": 26 },
    { name: "Avery Russell", email: "avery@example.com", "age": 29 },
    { name: "Ella Flores", email: "ella@example.com", "age": 33 },
    { name: "Jackson Collins", email: "jackson@example.com", "age": 27 },
    { name: "Madison Campbell", email: "madison@example.com", "age": 31 },
    { name: "Liam Murphy", email: "liamm@example.com", "age": 25 },
    { name: "Ethan Reed", email: "ethanr@example.com", "age": 34 },
    { name: "Ava Phillips", email: "ava@example.com", "age": 28 },
    { name: "Oliver Evans", email: "oliver@example.com", "age": 31 },
    { name: "Emma Bailey", email: "emma@example.com", "age": 27 },
    { name: "Liam Fisher", email: "liamf@example.com", "age": 32 },
    { name: "Sophia Cooper", email: "sophiac@example.com", "age": 29 },
    { name: "William Reed", email: "williamr@example.com", "age": 33 },
    { name: "Isabella Ward", email: "isabellaw@example.com", "age": 26 },
    { name: "Mason Gray", email: "mason@example.com", "age": 30 },
    { name: "Olivia Murphy", email: "oliviam@example.com", "age": 25 },
    { name: "Sophie Turner", email: "sophie@example.com", age: 27 },
    { name: "Henry Ford", email: "henry@example.com", age: 32 },
    { name: "Grace Kelly", email: "grace@example.com", age: 29 },
    { name: "Thomas Anderson", email: "thomas@example.com", age: 25 },
    { name: "Scarlett Johansson", email: "scarlett@example.com", age: 30 },
    { name: "Leonardo DiCaprio", email: "leonardo@example.com", age: 35 },
    { name: "Natalie Portman", email: "natalie@example.com", age: 31 },
    { name: "Chris Hemsworth", email: "chris@example.com", age: 34 },
    { name: "Jennifer Lawrence", email: "jennifer@example.com", age: 28 },
    { name: "Robert Downey Jr.", email: "robert@example.com", age: 37 },
    { name: "Jennifer Aniston", email: "jennifer.a@example.com", age: 52 },
    { name: "Brad Pitt", email: "brad.p@example.com", age: 58 },
    { name: "Angelina Jolie", email: "angelina.j@example.com", age: 46 },
    { name: "Leonardo DiCaprio", email: "leonardo.d@example.com", age: 47 },
    { name: "Tom Hanks", email: "tom.h@example.com", age: 65 },
    { name: "Meryl Streep", email: "meryl.s@example.com", age: 72 },
    { name: "Johnny Depp", email: "johnny.d@example.com", age: 58 },
    { name: "Charlize Theron", email: "charlize.t@example.com", age: 46 },
    { name: "Dwayne Johnson", email: "dwayne.j@example.com", age: 49 },
    { name: "Scarlett Johansson", email: "scarlett.j@example.com", age: 37 }
];

// Render the template with dynamic data
app.get('/', (req, res) => {
    const data = {
        title: 'Dynamic Table',
        users: users
    };
    res.render('template', data);
});


// need to share with varadhaman
app.get('/api/generatePDF', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the HTML content endpoint
        await page.goto('http://localhost:4000/');
        // await page.waitForTimeout(2000); 
        // Generate PDF from the rendered HTML
        // await page.emulateMedia('screen');
        const pdf = await page.pdf({ format: 'A4' });

        // Close the browser
        await browser.close();

        // Set response headers to trigger download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="generated-pdf.pdf"');

        // Send the PDF as response
        res.send(pdf);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});



// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
