# **Uploading An Image To A SQL Database.**
<sup>Chris Rudnicky</sup>   
<sup>2018</sup>

## Acknowledgements
_Without the help of Alex Garcia, Lina Shadrach, Scott Bulger, and Charley McGowan, this would not have been easy to figure out._


<!-- Write this more like an abstract -->
## Description
This document will outline a method that can save an Image to a MySql database and display it when correctly called upon. It will briefly touch upon datatypes used in the code, the reason for structuring the code the way it is

## Technologies Needed
This was written using:
 - C#
 - Microsoft AspNtetCore
 - MySql

## Table of Contents
  1. [ Setting Up A SQL Database](#sql-database)
  2. [Collecting An Upload](#collecting-an-upload)
  3. [Creating A Database Entry](#creating-a-database-entry)
  4. [Returning An Image From The Database](#returning-images-from-the-database)
  5. []

  ---
## SQL Database
The first step to consider when attempting to upload an image to the database is how you want to store your image. Currently (December 2018) MySql does not contain an image datatype, but there are several other datatypes that can support images. The most important thing to consider is the size of your image. There are many tutorials and articles that would mention using `VARBINARY(MAX)`, but it depends on the size of the image you want to store.

[Database Size](images/datatypesize.png)

A good limit to consider might be 2 megabytes whcih can easily be capture by a `LONGBLOB` as that can handle quite a few megabytes.

Set the column dataytpe to  `LONGBLOB` when creating your SQL table.

---
## Collecting An Upload
Files are uploaded through form inputs in html. The attributes of forms that have a file upload input are generally unchanged, but there is an addition of an `enctype ` attribute. The `enctype` attribute lets you specify an encoding type for your form. There are three options that you can use to set the value of `enctype`, but only consider using two:
- `multipart/form-data` is necessary if your users are required to upload a file through the form.
- `application/x-www-form-urlencoded` is the default value if the enctype attribute is not specified. This is the correct option for the majority of simple HTML forms.

The completed line of code for the form will look something like this:  

  ##### Views/New.cshtml:
      <form action="/product" method="post" enctype="multipart/form-data">
          <label for="img">Image Name</label>
          <input type="file" name="img" id="img">
          <button type="submit" name="button">Add Product</button>    
      </form>

---
## Creating A Database Entry
<!-- Datatypes used  should be listed as links here -->
As soon as the submit button has been pressed, the form data will be submitted to the database (this process is handled by code within a controller).
If you are not using Entity, this will mean writing out the SQL commands. Below is an example of a block of code that handles an upload to the database.

### Controller Action
    [HttpPost("/product")]
        public ActionResult Create(string name, string type, string description, IFormFile img, bool available, float price,int id)
        {

          byte[] newImg = new byte[0];
            if (img != null)
            {
                using (Stream fileStream = img.OpenReadStream())
                using (MemoryStream ms = new MemoryStream())
                {
                    fileStream.CopyTo(ms);
                    newImg = ms.ToArray();
                }
            }

          string stringImg = System.Text.Encoding.UTF8.GetString(newImg);

          Product newProduct = new Product (name, type, description, newImg, available, price, id);

          newProduct.Save();
          return RedirectToAction("Index");
        }


Let's break this down a bit.  
There are several datatypes that we need to use in order to upload an image to a database.

1. We see that the parameter name `img` matches the name attribute in the  form input: `<input type="file" name="img" id="img">`, but the datatype in the controller is an **IFormFile**.  This is because whenever we want to upload a file to SQL, the data will need to be converted into a sequence of bytes. The IFormFile measures the content of the file and turns it into a string that can be streamed into a byte array.  
  <sup>[_Read More about IFormFiles_](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-2.2)</sup>

2. We declare a new byte array to hold the data. The array is set to a default of zero so that we can overwrite the contents with actual data from our file.

3. Inside the conditional we use two different classes:  

        byte[] newImg = new byte[0];
        if (img != null)
        {
          using (Stream fileStream = img.OpenReadStream())
          using (MemoryStream ms = new MemoryStream())
          ...

  - **Stream** : This class is used to provide a generic view of different types of data that are broken down into bytes. This class serves as the base class for all streams.  
  <sup>[_Read More about Streams_](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream?view=netframework-4.7.2)</sup>

  - **MemoryStream** : This class is used to create a stream whose backing store is memory.  
  <sup>[_Read More about MemoryStreams_](https://docs.microsoft.com/en-us/dotnet/api/system.io.memorystream?view=netframework-4.7.2)</sup>

  We call the **IFormFile** method `OpenReadStream()` on our file in order to open the request stream for reading and store the data as a `Stream` object. Then, we create an empty `MemoryStream` which we will use later.  
  <sup>[_Read More about OpenReadStream()_](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.iformfile.openreadstream?view=aspnetcore-2.1)</sup>

  An important detail to note here is that this process occurs within two using statements. Using using statements the  we do here is useful for objects with lifetimes that are limited to the method or block in which they are created.

4. Next we direct our data using methods from the Stream class:
        ...
        {  
        fileStream.CopyTo(ms);  
        newImg = ms.ToArray();  
        }
        ...
In this block of code we use `CopyTo()` which is a method in the Stream class. It takes a stream and reads the bytes from it, and writes them to another stream. In this case it is putting our Stream filestream into a MemoryStream called ms.  
<sup>[_Read More about CopyTo(stream)_](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream.copyto?view=netframework-4.7.2#System_IO_Stream_CopyTo_System_IO_Stream_)

  Next we use the `ToArray()` method to direct our MemoryStream to the byte array that was created before the conditional. `ToArray()`returns a copy of the contents of the MemoryStream as a byte array which is why we must have a byte array available.  
  <sup>[_Read More about ToArray()_](https://docs.microsoft.com/en-us/dotnet/api/system.io.memorystream.toarray?view=netframework-4.7.2#System_IO_MemoryStream_ToArray)

5. After the conversion into a byte array has occurred we want to create a new object based off of the parameters passed into the `Create` action. As our picture is now a byte array, we want to make sure that we are passing our byte array into the constructor.

6. We call the save method on our new object which inserts all of the values we captured into our database.

---
## Returning Images From The Database
There are probably several ways to return an image when it is stored as a byte array in a database. Write a connection to a database and create an empty list to hold objects returned from the database. This part is standard for returning objects from a database, but we use a method called `GetBytes()` to return 

    while (rdr.Read())
      {
        Byte[] buffer = null;
        var length = rdr.GetBytes(6, 0L, null, 0, 0);
        buffer = new Byte[length];
        int readLength = Convert.ToInt32(length);

        int id = rdr.GetInt32(0);
        string name = rdr.GetString(1);
        string description = rdr.GetString(2);
        bool availability = rdr.GetBoolean(3);
        float price = rdr.GetFloat(4);
        string type = rdr.GetString(5);
        var img  = rdr.GetBytes(6, 0L, buffer, 0, readLength);

        Product newProduct = new Product(name, type, description, new byte[0], availability, price, id);
        var base64File = Convert.ToBase64String(buffer);
        string photo = String.Format("data:image/gif;base64,{0}", base64File);
        newProduct.SetImageString(photo);
        allProducts.Add(newProduct);
      }

Lets break this down a bit:

1. We need to create a byte array that we can send our information to. It will act as a buffer for our reader data in a sense.  
        Byte[] buffer = null;  
        var length = rdr.GetBytes(6, 0L, null, 0, 0);  
        buffer = new Byte[length];  
        int readLength = Convert.ToInt32(length);

  We set the buffer equal to null so that it can be used as a reference object. Arrays need to have a defined length, this makes retrieving objects that are different sizes a bit difficult so we use a method from the MySqlDataReader class called `GetBytes(int, long, byte[], int, int)` to measure the size of the image file. This method returns the numeric value of the number of bytes read. We use this value to set the size of the byte array we set to null, and finally we convert the return value from a `long` to an`int` datatype.  
  <sup>[_Read More about GetBytes()_](https://dev.mysql.com/doc/dev/connector-net/8.0/html/M_MySql_Data_MySqlClient_MySqlDataReader_GetBytes.htm)</sup>

2. Our next move is to begin to read from our database. Again, we use the `GetBytes()` method, but instead setting the third value of the method to null like we did in the buffer, we set it to buffer and we set the last parameter to an integer that represents the length of the byte array:

        var img  = rdr.GetBytes(6, 0L, buffer, 0, readLength);




---
