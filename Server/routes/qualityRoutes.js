// const express = require('express')
// const qc = require('../models/QualityChallenges')
// const qa = require('../models/QualityActions');
// const graph = require('../Controller/Graph')
// const router =express.Router();

// router.get('/quality/form', (req, res) => {
//     res.render('Quality/form', { title: 'Quality/form' })
// });

// router.get('/getQC', (req, res) => {
//     qc.find().then((challenges) => {
//         res.json(challenges)
//     }).
//         catch(err => {
//             console.log(err);
//             res.sendStatus(404)
//         })
// })

// router.post('/addQC',(req,res)=>{
//      let challenge = new qc(req.body)
//      challenge.save().then(
//         res.redirect('quality/form')
//     )
// })

// router.post('/addQA',(req,res)=>{
//     let action = new qa(req.body);
//     action.save().then(
//         res.redirect('quality/form')
//     )
// })

// router.get('/quality/action',(req,res)=>{
//     res.render('Quality/qualityAction',{title:'Quality Action Plan'})
// })

// router.get('/quality/overallPunch', (req, res) => {
//     graph.graphController('Quality/overallPunch', 'Overall Punch', res)
// })

// router.get('/quality/cpaPunch', (req, res) => {
//     graph.graphController('Quality/cpaPunch', 'CPA Punch', res)
// })

// router.get('/quality/cpaAltroz', (req, res) => {
//     graph.graphController('Quality/cpaAltroz', 'CPA Altroz', res)
// })

// router.get('/quality/overallAltroz',(req,res)=>{
//     graph.graphController('Quality/overallAltroz','Overall Altroz',res)
// })

// router.get('/quality/do', async (req, res) => {
//     try{
//         const [challenges,actions] = await Promise.all([qc.find(),qa.find()])
//             res.render('Quality/do',{title:'Quality do\'s',challenges,actions})
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(404);
//     }
// })

// router.get('/quality', (req, res) => {
//     res.render('Quality/index', { title: 'Quality' })
// })

// module.exports = router
