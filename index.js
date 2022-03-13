const { timeStamp } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://vadivelan1998:vadivelan1234@cluster0.dmoz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};

//section schema
const sectionSchema = new mongoose.Schema(
  { sectionName: { type: String, required: true } },
  { timestamps: true }
);
const Section = mongoose.model("section", sectionSchema);


//Books Schema
const bookSchema=new mongoose.Schema(
{   name:{type:String,required:true},
    body:{type:String,required:true},
    sectionId:{type: mongoose.Schema.Types.ObjectId,
          ref:"section",
        required:true}
},
{
    timestamps:true
}
)
const Book=mongoose.model("book",bookSchema)


// author schema
const authorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true
    }
  },
  {
    timestamps: true,
  }
);
const Author=mongoose.model("author",authorSchema)

//section CRUD
app.get("/section", async (req, res) => {
  try {
    const section =await Section.find().lean().exec();
    return res.status(200).send(section);
  } catch (error) {
    req.status(500).send("something went wrong", error);
  }
});

app.post("/section",async(req,res)=>{
    try {
        const section = await Section.create(req.body);
       return res.status(200).send({section:section})
        
    } catch (error) {
        
    }
    
})
app.patch("/section/:id",async(req,res)=>{
    try {
        const section = await Section.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )
          .lean()
          .exec();
        res.status(200).send({section:section})
    } catch (error) {
        
    }

})
app.delete("/section/:id",async(req,res)=>{
    try {
        const section= await Section.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send({section:section})
        
    } catch (error) {
        
    }
})



//Books CRUD


app.get("/book", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();
    return res.status(200).send(book);
  } catch (error) {
    req.status(500).send("something went wrong", error);
  }
});

app.post("/book", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(200).send({ book: book });
  } catch (error) {
      console.log(error)
  }
});
app.patch("/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(200).send({ Book: book });
  } catch (error) {}
});
app.delete("/book/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    res.status(200).send({ book: book });
  } catch (error) {}
});

//Author CRUD
app.get("/author", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();
    return res.status(200).send(author);
  } catch (error) {
    req.status(500).send("something went wrong", error);
  }
});

app.post("/author", async (req,res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(200).send({ author: author });
  } catch (error) {
      console.log(error)
  }
});
app.patch("/author/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(200).send({ author: author });
  } catch (error) {}
});
app.delete("/author/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec();
    res.status(200).send({ author: author });
  } catch (error) {}
});




app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (error) {
    console.log(error);
  }
});
