const LLData = require("./LLData");

module.exports.LList = class LList
{
    constructor()
    {
        this.head = null
        this.length = 0
    }

    [Symbol.iterator]() {
        let iter = this.head;
        return {
            next: function ()
            {
                if (!iter)
                {
                    return { done: true };
                }
                let cur = iter.data;
                iter = iter.next;
                return {
                    value: cur,
                    done: false
                };
            }
        }
    }

    getFirst()
    {
        return this.head.data;
    }

    getLast()
    {
        let iter = this.head;
        while (iter.next)
        {
            iter = iter.next;
        }
        return iter.data;
    }

    add(value)
    {
        let newD = new LLData(value);
        if (this.length == 0)
        {
            this.head = newD;
        }
        else
        {
            let iter = this.head;
            while (iter.next)
            {
                iter = iter.next;
            }
            iter.next = new LLData(value);
        }
        this.length++;
    }

    addFromArray(arr)
    {
        let lengArr = arr.length;
        var i = 0;
        if (this.length == 0)
        {
            this.head = new LLData(arr[0]);
            i = 1;
        }
        let iter = this.head;
        while (iter.next) 
        {
            iter = iter.next;
        }
        for (i; i < lengArr; i++)
        {
            iter.next = new LLData(arr[i]);
            iter = iter.next;
        }
    }

    remove(value)
    {
        let iter = this.head;
        let prev = iter;
        if (iter)
        {
            if (this.head.data == value)
            {
                this.head = this.head.next;
                return;
            }
            while (iter && iter.data != value)
            {
                prev = iter;
                iter = iter.next;
            }
            if (iter)
            {
                prev.next = iter.next;
            }
        }
    }

    removeAll(value)
    {
        let iter = this.head;
        let prev = iter;
        if (iter)
        {
            if (this.head.data == value)
            {
                this.head = this.head.next;
            }
            while (iter.next)
            {
                prev = iter;
                iter = iter.next;
                if (iter.data == value)
                {
                    prev.next = iter.next;
                }
            }
        }
    }

    contains(value)
    {
        let iter = this.head;
        if (iter)
        {
            while (iter.next)
            {
                if (iter.data == value)
                {
                    return true;
                }
                iter = iter.next;
            }
            return false;
        }
        else
        {
            return false;
        }
    }

    clear()
    {
        this.head = null;
    }

    count()
    {
        let iter = this.head;
        let count = 0;
        if (iter)
        {
            while (iter.next)
            {
                iter = iter.next;
                count++;
            }
            count++;
        }
        else
        {
            count = 0;
        }
        return count;
    }

    toString()
    {
        let iter = this.head;
        let str = "";
        if (iter)
        {
            while (iter.next)
            {
                if (iter.next.next)
                {
                    str += iter.data + ", ";
                }
                else
                {
                    str += iter.data;
                }
                iter = iter.next;
            }
        }
        console.log(str);
    }

    getIterator()
    {
        return this[Symbol.iterator]();
    }

    filter(callback)
    {
        let newList = new LList();
        let iter = this.head;

        if (iter)
        {
            while (iter.next)
            {
                if (callback(iter.data))
                {
                    newList.add(iter.data);
                }
                iter = iter.next;
            }
        }
        return newList;
    }
}

