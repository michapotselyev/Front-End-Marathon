const Model = require('./Model');
const connection = require('./connection');
export default class Hero extends Model
{
    constructor(id, name, description, class_role)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.class_role = class_role;
    }

    find(id)
    {
        connection.query(`SELECT * FROM heroes WHERE id = ${id}`,
        function(err, results, fields)
        {
            console.log(err);
            console.log(results);
            console.log(fields);
        });
    }

    delete(id)
    {
        connection.query(`DELETE FROM heroes WHERE id = ${id}`, function(err, results)
        {
            if(err)
            {
                console.log(err);
            }
        });
    }

    save()
    {
        connection.query(`INSERT INTO heroes (name, description, class_role) VALUES(${this.name}, ${this.description}, ${this.class_role})`, function(err, results)
        {
            if(err)
            {
                console.log(err);
            }
        });
    }
}

