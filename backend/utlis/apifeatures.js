 class Apifeatures {
    constructor(query,queryStr){
        this.query= query;
        this.queryStr= queryStr;
    }

    search(){
        const keyword= this.queryStr.keyword  
        
        ?{

            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            }



        }:{};
        this.query= this.query.find({...keyword});

        return this;
    }

    filter(){
        const queryCopy= {...this.queryStr};
      
        //Remove fields for categroy

        const removeFields =["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key]);
        
     



        // Filter for Price and Rating


        let queryStr= JSON.stringify(queryCopy);
       
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query= this.query.find(JSON.parse(queryStr));
        console.log(queryStr);


        return this;

        //this.query find product this we have passed as a params

    }
    pagination(resultPerPage){
            const currentPage= Number(this.queryStr.page) || 1;

            const skip= resultPerPage * (currentPage -1);
            this.query = this.query.limit(resultPerPage).skip(skip);

            return this;
    
    
    
        }


 }

 module.exports= Apifeatures;