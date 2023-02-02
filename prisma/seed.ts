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

function getHabits() {
    return [
        {
            type: "mood",
            name: "hello world ??",
            HabitEntry: {
                create: [
                    {
                        updatedAt: new Date(),
                        // habit_id: 1,
                        date: new Date('2023-1-1'),
                        value: 0               
                    },
                    {
                        updatedAt: new Date(),
                        // habit_id: 1,
                        date: new Date('2023-1-2'),
                        value: 1  
                    },
                    {
                        updatedAt: new Date(),
                        // habit_id: 1,
                        date: new Date('2023-1-3'),
                        value: 0    
                    },
            ]}
        },
        {
            type: "medication",
            name: "hellerrr?",
            HabitEntry: {
                create: [
                    {
                        updatedAt: new Date(),
                        // habit_id: 1,
                        date: new Date('2023-1-4'),
                        value: 0   
                    },
                    {
                        updatedAt: new Date(),
                        // habit_id: 1,
                        date: new Date('2023-1-5'),
                        value: 0   
                    },
                    {
                        updatedAt: new Date(),
                        // habit_id: 1,
                        date: new Date('2023-1-6'),
                        value: 1 
                    },
                    {
                        updatedAt: new Date(),
                        // habit_id: 1,
                        date: new Date('2023-1-31'),
                        value: 1 
                    }
                ]
            }
        },
    ]
}

async function seed() {
    const entries = getEntries()
    const habits = getHabits()

    // for (const entry of entries) {
    //     await prisma.journalEntry.create({ data: entry })
    // }

    for (const habit of habits) {
        await prisma.habit.create({ data: habit })
    }
}

seed()

console.log("Finished seeding the database");
