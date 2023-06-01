# AI Frameworks

---

## Pytorch

PyTorch is an optimized tensor library for deep learning using GPUs and CPUs. We want this powerful processing so that the ML processes can be executed efficiently.

Most machine learning workflows involve working with data, creating models, optimizing model parameters, and saving the trained models.

Tensors are a specialized data structure that are very similar to arrays and matrices. In PyTorch, we use tensors to encode the inputs and outputs of a model, as well as the model’s parameters. Tensors are similar to NumPys `ndarrays`, except that they can run on GPUs.

## Pytorch provides two primitives to interact with model data, the `Dataset` and `Dataloader`. The `Dataset` allows us to get data from an external source, or load our own. Once we have available data and labels, we can use the `Dataloader` to iterate over the data, shuffle it, and display content from the samples.
