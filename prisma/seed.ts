import PrismaClientPkg from '@prisma/client'

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient
const prisma = new PrismaClient()

function getEntries() {
    return [
        {
            title: "hello",
            body: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"hello world ??"}]}]}`,
            preview: "preview"
        },
        {
            title: "bingus",
            body: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"when the when when the when"}]}]}`,
            preview: "preview"
        },
        {
            title: "very long title testing wow this title is very long!!!!",
            body: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}]}]}`,
            preview: "preview"
        },
        {
            title: "pee pee",
            body: `{"type":"doc","content":[{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"poo poo"}]}]}]}`,
            preview: "preview"
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
