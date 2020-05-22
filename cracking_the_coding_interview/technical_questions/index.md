# VII. Technical Questions
> Notes taken from pages 61 - 78

## Understand The Following


| Data Structures| Algorithms | Concepts |
|---|---|---|
| Linked List | Breadth First Search | Bit Manipulation |
| Trees, Tries, and Graphs | Depth First Search | Memory (Stack vs Heap) |
| Stacks and Queues | Binary Search | Recursion |
| Vectors and Array Lists | Merge Sort | Dynamic Programming |
| Hash Tables | Quick Sort | Big O |
> _(figure 1.)_ Important things to know to be a good programmer.

## Tips for Solving Technical Questions

1. Use a brute force method first. It's okay if the first attempt at a problem is not the most efficient. **You don't want to give the impression that you are having a difficult time with an easy solution**.
2. Use a bigger dataset than what the question gives you in examples.
3. Use data structures generously. It can help to create your own to make code more readable and manageable.
	- use modular code
	- use reusable code chunks
4. Solve for variables rather than hard coded values. (nxn vs 3x3)

## Optimizing with B.U.D.
> pg 67 - 69

After creating a brute force solution to the problem, optimize it using the following acronym:

**B** ottlenecks

**U** nnecessary work

**D** uplicate work

#### Bottlenecks

Bottlenecks slow down the overall runtime. Here are two common ways to create/identify bottlenecks: 

1.  If an algorithm has a series of steps in which each subsequent step relies on a computation preformed in the preceding step. If you can optimize step 2 but step 1 has a larger runtime, then step 1 will create a bottleneck.
2. If an algorithm has a chunk of work that is done repeatedly like searching (use a hash table instead?)

#### Unnecessary Work

To identify any unnecessary work requires thinking critically about a problem. What do you need to solve it vs not need?

#### Duplicate Work

If comparing values, do we need to compute the first set each time? Could we use a data structure instead?

## Optimizing and Solving Styles
> pg 69-78

### DIY Style

We often act out certain behaviors in life intuitively like a series of algorithmic steps. McDowell uses a great example in which she compares searching for a name in an alphabetical list to a binary search. We know to look for the name Xavier Smith in the last quarter of an alphabetically ordered list of names, just like a binary search splits a group up. 

With this in mind, it can be useful to try to solve an algorithm by thinking about how you would solve the problem in the real world.

### Simplification and Generalization

Over simplify the problem, then use the approach you created to solve a simple version on a bigger version. McDowell uses the example of searching for characters in an array rather than words in a string. By thinking about returning a single character we create a smaller problem and can apply the logic to the larger problem.

### Base Case and Build

This is for problems which can be solved recursively. You can identify recursive problems when you have to manipulate values or change something about a single array.

### Data Structure Brainstorm

This approach requires intimate knowledge of the data structures listed in figure 1. Essentially you would apply each data structure to a problem to see if it can be solved with the structure.

## What is Good Code Anyway

Good code is code which is:
- correct
- simple
- efficient
- maintainable

Consider the developer experience of your code as well as time and space efficiency. Oftentimes you will need to find a balance between the two.

