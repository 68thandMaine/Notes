# Hash Tables

Hash Tables provide efficient lookups through storing information in an array as key/value pairs. See below for the steps to a simple implementation of a hash table:

1. Compute the hash code of a key.
2. Map the hash code to an index in an array.
3. At the index implement a linked list and store/retrieve data with the key and it's value.

> The use of a linked list allows us to avoid the negative effect collisions. We can now store multiple data with the same hash code in an index of the array.

___

## Hashtable Class C#

C# comes with a `Hashtable` class which can be exposed through with the `System.Collections` Namespace.

[Click for an example of a C# Hashtable implementation](./examples/c#_hashtable.md)

**Oddly enough, the Microsoft documentation reccomends using a `Dictonary<TKey, TValue>` class rather than the `Hashtable` class as it is more generic.**

___

## Hashtable JavaScript

It is likely that I won't need to create my own hash table function as JavaScript has it's own class for it (similar to C# using dictionaries).

The following is an example of a Hash Table written with JavaScript:

```JavaScript
const hash = (string, max) => {
	let hash = 0;
	for(let i = 0; i < string.length; i+=1) {
		hash += string.charCodeAt(i);
	}
	return hash % map
}

let HashTable = function() {
	let storage = [];
	const storageLimit = 4;

	this.print = () => {
		console.log(storage);
	}

	this.add = (key, value) => {
		let index = hash(key, storageLimit);
		if(storage[index] === undefined) {
			storage[index] = [
				[key, value]
			];
		} else {
			let inserted = false;
			for(let i = 0; i < storage[index].length; i += 1) {
				if(storage[index][i][0] === key) {
					storage[index][i][1] = value;
					inserted = true;
				}
			}
			if(inserted === false) {
				storage[index].push([key, value]);
			}
		}
	};

	this.remove = (key) => {
		let index = hash(key, storageLimit);
		if(storage[index].length === 1 && stoage[index][0][0] === key) {
			delete storage[index];
		} else {
			for (let i = 0; i < storage[index]; i += 1) {
				if(storage[index][i][0] === key) {
					delete storage[index][i];
				}
			}
		}
 	};

	this.lookup = (key) => {
		let index = hash(key, storageLimit);
		if(storage[index] === undefined) {
			return undefined;
		} else {
			for (let i = 0; i < storage[index].length; i += 1) {
				if (storage[index][i][0] === key) }
				return storage[index][i][1];
			}
		}
	};

};

```

| Method | Purpose | Notes |
|---|---|---|
| `hash(string, max)` | Used to compute the hash code of the key provided. | The **string** argument is the key that needs to be encoded into a numerical value. The **max** argument is the total number of buckets to assign to each code. Since we are creating numerical values from strings, we use the `charCodeAt()` method to calculate the unicode value of each string passed into the function. |
| `HashTable()` | This is the function which we use to create a hash table. |  This function holds everything together. Notice the **storage** variable which is used to hold the values of the hash table. |
| `this.add(key, value)` | Adds entries into the Hash table. | Create a variable called `index` to hold the value created by the hash function. The function then checks to see if there is an entry in the **storage array**, if there is no entry at this index then create a new entry with `storage[index] = [[key, value]]`. What's cool here is that we insert an array into an array. If there is an entry at the index, then  initialize a variable called **inserted**, then iterate over the entries at this specific index. Check to see if the data that is being inserted already exists by seeing if the keys and values match up. If they do, then set **inserted** to be true.  If inserted is false, then push the new data into the next index of the storage array.|
| `this.remove(key)` | Removes values from the **storage array**. | Looks through the number of buckets found at each index in the **storage array**, if the length is 1 (meaning one bucket exists), then check the key of the first bucket. It will be a specific address using array indexes. If the keys match, then delete the index. If the keys do not match, then iterate over all buckets at the index and determine which bucket contains the key that needs to be deleted.|
| `this.lookup(key)` | Returns values from the Hash table | This function returns values from **storage array** if the keys match, then return the value. |

### Implementing a JavaScript Hash Table

To implement the Hashtable class that was created above all we need to do is something like this:

```JavaScript
let ht = new HashTable();
ht.add('beau', 'person');
```

As you can see, all we need to do is call the methods we created on the HashTable class to add, remove, or lookup values which have been stored.

## References

- Dotnet-Bot. (n.d.). Hashtable Class (System.Collections). Retrieved from https://docs.microsoft.com/en-us/dotnet/api/system.collections.hashtable?view=netcore-3.1
- McDowell, Gayle Laakmann, 1982-. (2011). Cracking the coding interview : 150 programming questions and solutions. Palo Alto, CA :CareerCup, LLC,
- https://codepen.io/beaucarnes/pen/VbYGMb?editors=0012&__cf_chl_jschl_tk__=561694e67df579c8f42611feea6b3e99d05c420b-1590879994-0-Ad1Med2XrCXR5AISpX3qF1MqMNmvQ_72OrjwXYRAAhJQYnRegKV_BWe5o2gWv6-8TfFLVKoC8wrOpGf8q87lutFeolJ2bheN1_iNP-qyEMB-1x0lbrQRAW2Gnb-9skyYSrlpRgt4ZALBaRIF7JqLvVMqG65SozgK47gI1OqiQjyRuIGWvgFutDExEpxoy0Y9p0N31wfYFV5RFdJIMYdlSQ12UEeN0VozbDuaYc_fQ-910e1ffL9vwipDyRiqSTuupcg5bdS58iuZhFAWvAhqRJwpnLLk6zkB7xue4GgwRHub1SSgDc-Sh1-G6k3p85G5uwpLbMhtNY8-84akpjM1Ee11k4er-BNmRJ5MhBTP9mVHMPDOczTwMR4XPQMU9-212Q