# One Eleven — Developer Task

A serverless API that receives a string, sorts its characters alphabetically, and returns them as an array. Built as part of the One Eleven Junior Developer application.

---

## Live URLs

- **Frontend:** https://oneeleven-task-six.vercel.app
- **API Endpoint:** https://oneeleven-task-six.vercel.app/api/sort

---

## How It Works

The API receives a JSON body with a `data` field containing a string, splits it into individual characters, sorts them alphabetically, and returns the sorted characters as an array.

**Request**
```json
POST /api/sort
Content-Type: application/json

{ "data": "example" }
```

**Response**
```json
{
  "word": ["a", "e", "e", "l", "m", "p", "x"]
}
```

---

## Project Structure

```
oneeleven-task/
├── api/
│   └── sort.js        # Serverless API endpoint
├── public/
│   ├── index.html     # Frontend UI
│   ├── style.css      # Styles
│   └── app.js         # Frontend logic
├── vercel.json        # Vercel deployment config
└── README.md
```

---

## Running Locally

You will need [Node.js](https://nodejs.org) installed.

**Step 1 — Clone the repository**
```bash
git clone https://github.com/phumlajobe/oneeleven-task.git
cd oneeleven-task
```

**Step 2 — Start the API server** (in one terminal)
```bash
node -e "const h=require('http');h.createServer((req,res)=>{res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');if(req.method==='OPTIONS'){res.writeHead(200);return res.end();}if(req.method==='POST'){let b='';req.on('data',d=>b+=d);req.on('end',()=>{try{const {data}=JSON.parse(b);res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({word:data.split('').sort()}));}catch(e){res.writeHead(400);res.end(JSON.stringify({error:'Invalid JSON'}));}});}else{res.writeHead(404);res.end('Not found');}}).listen(4000,()=>console.log('API running on http://localhost:4000'));"
```

**Step 3 — Start the frontend server** (in a second terminal)
```bash
npx serve public
```

**Step 4 — Open the app**

Go to `http://localhost:3000` in your browser and set the API URL to:
```
http://localhost:4000/api/sort
```

---

## Testing the API

**Test locally using the frontend form:**
1. Enter your API URL: `http://localhost:4000/api/sort`
2. Enter input: `{ "data": "example" }`
3. Click **Test Locally →**

**Validate against One Eleven's checker:**

Open this URL in your browser (replace with your details):
```
https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=https://oneeleven-task-six.vercel.app/api/sort&email=phumlasj@gmail.com
```

---

## Tech Stack

- **Backend:** Node.js (Vercel Serverless Functions)
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Deployment:** Vercel

---

## Author

**Phumla Sithole**
- Email: phumlasj@gmail.com
- LinkedIn: linkedin.com/in/phumla-sithole
- GitHub: github.com/phumlajobe