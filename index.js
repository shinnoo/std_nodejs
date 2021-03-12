const request = require("request");
const cheerio = require("cheerio");

function proxyGenerator() {
  let ip_addresses = [];
  let port_numbers = [];
  let proxy;

  request("https://sslproxies.org/", function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $("td:nth-child(1)").each(function(index, value) {
        ip_addresses[index] = $(this).text();
      });

      $("td:nth-child(2)").each(function(index, value) {
        port_numbers[index] = $(this).text();
      });
    } else {
      console.log("Error loading proxy, please try again");
    }

    ip_addresses.join(", ");
    port_numbers.join(", ");
})
}


const options = {
    url: "https://www.forextradingbig.com/10-facts-you-must-know-on-online-forex-trading/",
    method: "GET",
    proxy: proxyGenerator()
  };
  
for (let index = 0; index < 10; index++) {
    request(options, function(error, response, html) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          let article_headings = $("h2").text();
          console.log(article_headings);
        } else {
          console.log("Error scraping site, please try again");
        }
      });
}