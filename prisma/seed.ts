import PrismaClientPkg from '@prisma/client'

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient
const prisma = new PrismaClient()
// set user string to whatever user you want to seed
const user_id = "";
function getEntries() {
    return [
        {
            title: "hello",
            body: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"hello world ??"}]}]}`,
            preview: "preview",
            user_id: user_id
        },
        {
            title: "bingus",
            body: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"when the when when the when"}]}]}`,
            preview: "preview",
            user_id: user_id
        },
        {
            title: "very long title testing wow this title is very long!!!!",
            body: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}]}]}`,
            preview: "preview",
            user_id: user_id
        },
        {
            title: "pee pee",
            body: `{"type":"doc","content":[{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"poo poo"}]}]}]}`,
            preview: "preview",
            user_id: user_id
        }
    ]
}

async function seed() {
    const entries = getEntries()

    for (const entry of entries) {

        await prisma.journalEntry.create({ data: entry })
    }
}

seed()

console.log("Finished seeding the database");
