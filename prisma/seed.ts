import PrismaClientPkg from '@prisma/client'

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient
const prisma = new PrismaClient()

function getEntries() {
    return [
        {
            title: "hello",
            body: "test 123 *testing*"
        },
        {
            title: "bingus",
            body: "when the when when the when"
        },
        {
            title: "very long title testing wow this title is very long!!!!",
            body: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "pee pee",
            body: "poo poo"
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
