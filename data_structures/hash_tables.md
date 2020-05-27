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

## References

- Dotnet-Bot. (n.d.). Hashtable Class (System.Collections). Retrieved from https://docs.microsoft.com/en-us/dotnet/api/system.collections.hashtable?view=netcore-3.1
- McDowell, Gayle Laakmann, 1982-. (2011). Cracking the coding interview : 150 programming questions and solutions. Palo Alto, CA :CareerCup, LLC,
