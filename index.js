const http = require("http");
const url = require("url");
const fs = require("fs");

const replace=(temp,product)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%QUANTITY%}/g,product.quantity);
    output=output.replace(/{%PRICE%}/g,product.price);
    output=output.replace(/{%FROM%}/g,product.from);
    output=output.replace(/{%VITAMIN%}/g,product.nutrients);
    output=output.replace(/{%DESCP%}/g,product.description);
    output=output.replace(/{%ID%}/g,product.id);

    if (!product.organic) {
      output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    } else {
      output = output.replace(/{%NOT_ORGANIC%}/g, "");
    }

        return output;
}

const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  "utf-8"
);

const tempover = fs.readFileSync(
  `${__dirname}/starter/templates/overview.html`,
  "utf-8"
);

const tempcard = fs.readFileSync(
  `${__dirname}/starter/templates/card.html`,
  "utf-8"
);

const temproduct = fs.readFileSync(
  `${__dirname}/starter/templates/product.html`,
  "utf-8"
);


const dataobj = JSON.parse(data);

const server = http.createServer((req, res) => {

  const {query,pathname}=(url.parse(req.url,true));
  
   

  //overview page
  if (pathname === "/") {
  res.writeHead(200, { "content-type": "text/html" });
    const cards=dataobj.map(e=> replace(tempcard,e)).join('');
    const output = tempover.replace("{%PRODUCTS%}", cards); 
    //console.log(cards);
    
    res.end(output);
  
} 

  //products  page
  else if (pathname === "/product") {
    res.writeHead(200,{"content-type":'text/html'});
    const product=dataobj[query.id];
    const output =replace(temproduct,product);

    res.end(output);
} 

  //api page
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
}

      //not found
      else res.end("Page not found");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening");
});
