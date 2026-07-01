const OpenAI = require("openai");
const Chat = require("../models/chat");
//const { model } = require("mongoose");
//const { Content } = require("openai/resources/skills/content.js");


const askQuestion = async (req,res)=>{
    try{
        const client = new OpenAI({apiKey:process.env.OPENAI_KEY?.trim(),
             baseURL:"https://openrouter.ai/api/v1"
        });
           const {question} = req.body;
           if(!question) {
            return res.status(400).json({
                success:false,
                message:"Question is required"
            });
         }

         const response = await client.chat.completions.create({
            model:"openai/gpt-4o-mini",
            messages:[
                {
                    role:"system",
                content:"you are a helpful teacher for beginner students. explain the answer in simple higlish language with example"
                },
                {
                    role:"user",
                    content:question
                }
            ]
         });
         const answer = response.choices[0].message.content;
//  const response = await client.response.create({
//               model :"gpt-5.5",
//               input:`you are a helpful teacher for beginner students.
//               explain the answer in simple higlish language with example. Question:${question}`
//  });  
    //   const answer = response.output_text;
      const chat = await Chat.create({question, answer});
      res.status(201).json({
        success:true,
        message:"answer generted",
        data: chat
      })      

    }
    catch(err){
          console.log("Ask Question error",err);
          res.status(500).json({
            success:false,
            message:"failed to answer question"
          });
    }
};

const getAllchat = async (req,res)=>{
    try{
          const chats =(await Chat.find()).Sort({createAt:-1});
          res.status(200).json({
            success:true,
            total:chats.length,
            date :chats
          });
    }
    catch(err){
   console.log("unable to loads chat",err);
   res.status(500).json({
    success:false,
    message:"unable to get chat logs"
   });
    }
};

const deleteAllChats = async (req,res)=>{
         try{
              await Chat.deleteMany();
              res.status(200).json({
                success:true,
                message:"all chat deleted"
              })
         }
         catch(err){
            console.log("unable to delete chats",err);
            res.status.json({
                success:false,
                message:"unable to delet chat"
            })
         }
};
module.exports = {askQuestion,getAllchat,deleteAllChats};