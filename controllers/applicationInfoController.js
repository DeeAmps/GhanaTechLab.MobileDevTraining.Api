const express = require("express");
const applicationInfoRouter = express.Router();

applicationInfoRouter.get('/', async (req, res) => {
    return res.json({"status": "LIVE! Application Info"}).status(200);
});

applicationInfoRouter.get('/getAll', async (req, res) => {
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            reslts.dbo.collection("PersonalInfo").find({}).toArray((err, result) => {
                if (err) res.json(err).status(500);
                reslts.db.close();
                return res.json(result).status(200)
            });
        });
})

applicationInfoRouter.post('/postApplication', async (req, res) => {
    const personalInfo = req.body["data"].personalInfo;
    const eduSkills = req.body["data"].eduSkills;
    const other = req.body["data"].other
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            try{
                reslts.dbo.collection("PersonalInfo").insertOne({
                    FullName : personalInfo.fna,
                    Email: personalInfo.email,
                    Phone: personalInfo.phone,
                    Location: personalInfo.location,
                    Region: personalInfo.region,
                    DateOfBirth: personalInfo.dob,
                    IDType: personalInfo.idt,
                    IDNumber: personalInfo.id,
                    Gender: personalInfo.gender,
                    ProgrammingKnowledge: eduSkills.programmingKnowledge ? 'YES' : 'NO',
                    Instituition: eduSkills.instituition,
                    EducationLevel: eduSkills.educationLevel,
                    CourseStudied: eduSkills.course,
                    EntrepreneurialExperience: eduSkills.entrepreneurial ? 'YES' : 'NO',
                    ProgrammingLanguages: eduSkills.languages,
                    ProgrammingLevel: eduSkills.programmingRate,
                    Employed: other.employed ? 'YES' : 'NO',
                    CurrenRoleIfEmployed: other.currentRole,
                    Motivation: other.motivation,
                    CurrentEnrolledInAnyProgram: other.enrolled ? 'YES' : 'NO',
                    FullParticipationForOneMonth: other.fullparticipation ? 'YES' : 'NO',
                    ReadyToCommitToIncubationProgram:  other.commit ? 'YES' : 'NO',
                    ConsiderForInternship: other.internOpportunity ? 'YES' : 'NO',
                    HeardAboutUsThrough: other.heardAboutUsThrough
                });
                return res.json({success : true}).status(200);
            } catch(e){
                console.log(e)
                return res.json({success : false}).status(500);
            }
        });
   
})

module.exports = applicationInfoRouter