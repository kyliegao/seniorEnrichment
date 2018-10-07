Sequelize = require('sequelize')
pg = require('pg')
db = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost:5432/acmeschool')

const School = db.define('school',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
})


const Student = db.define('student',{
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    gpa: {
        type: Sequelize.DECIMAL
    }
})

Student.belongsTo(School)
School.hasMany(Student)

const seed = () => {
    db.sync({ force: true } )
    .then( () => {
        return Promise.all([
            School.create({name: 'Queer Quilting Institute', address: '1 Needle Nook, Country Hill', description: 'The Institute of Queer Quilting provides a safe space for those who want to nurture their talent for out of the ordinary designs and patterns, this is a selective school with only one out of 1000 applicants accepted, and an annual cohort of between 1 - 3 students.  All sales from student quilts go to support The Society of Deer Keepers.  Ordinary quilters need not apply.'}),
            School.create({name: 'Practical Painters College', address: '1 Painter Lane, Middle Hill', description: 'We practice pratical painting only.  Students are skilled in painting interior and exterior walls, shopfront displays (but not the gaudy ones), and public pools (no private pool qualifications allowed).  No canvasses, statues or murals, just perfect streaks of block color on flat surfaces.'}),
            School.create({name: 'School of Serious Psychics', address: 'use your abilities', description: 'students can major in crystal balls, tarot cards or i-ching rods.  Principal Ling is an acclaimed Eastern Psychic who has correctly read the fortunes of 8 out of 10 high paying Malaysian businessmen.'}),
            School.create({name: 'AAAnalytics Academy', address: '1 Queens Boulevard, City', description: 'this academy starts with four capital letters, because that is the sound our students make when confronted with the unique challenges we present to them on a daily basis.  At any one time, there is a sustained aaa that can be audibly heard from within a three mile radius.  The name has also allowed us to make the top (and therefore the first choice) of the [alphabetically] ranked National schools list.' }),
            Student.create({firstName: 'Coco', lastName: 'Nuts', gpa: 3 }),
            Student.create({firstName: 'Jupiter', lastName: 'Chiron', gpa: 4}),
            Student.create({firstName: 'Paul', lastName:'Party', gpa: 4.5}),
            Student.create({firstName: 'Felix', lastName: 'Double', gpa: 3.8}),
        ])
        .then( data => {
            const [QueerQuiltingInstitute, PracticalPaintersCollege, SchoolofSeriousPsychics, AAAnalyticsAcademy, Coco, Jupiter, Chiron, Helix] = data
            
            return Promise.all([
                Coco.setSchool(QueerQuiltingInstitute),
                Jupiter.setSchool(SchoolofSeriousPsychics),
                Helix.setSchool(AAAnalyticsAcademy),
            ])
        })
        .then( () => console.log('data successfully seeded'))
        .catch( ex => console.log(ex))
    })
}

const test = 'test'

// seed()
//to run the seed without a server use nodemon 

module.exports = {
    School,
    Student,
    seed,
    test,
}