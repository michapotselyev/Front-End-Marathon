let {Product} = require('./product')
let EatException = require('./eat-exception')
class Ingestion
{
    products = [];
    day_of_diet = 0;
    constructor(meal_type, id)
    {
        this.id = id;
        this.meal_type = meal_type;
    }
    setProduct(product)
    {
        this.products.push(product);
    }
    getProductInfo(product)
    {
        let result = {};
        for (let p of this.products) 
        {
            if (p.aname == product) 
            {
                result.kcal = p.kcal_per_portion;
                return result;
            }
        }
        return {};
    }
    getFromFridge(product) 
    {
        for (let p of this.products)
        {
            if (p.aname == product) 
            {
                try 
                {
                    p.check();
                } 
                catch (e) 
                {
                    e.message = `To many calories in ${product} for ${this.meal_type}`;
                    throw e;
                }
            }
        }
    }
}

module.exports.Ingestion = Ingestion;

