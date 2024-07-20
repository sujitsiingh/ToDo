const Todo = require('../models/todoModel');

module.exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    if (!todos) return res.status(400).json({ message: 'No Todos, Add first' });

    res.status(200).json({ message: 'Todos', todos });
  } catch (error) {
    res.status(404).json({ message: 'Todos not found' });
  }
};

module.exports.getTodosByUser = async (req, res) => {
  const userId = req.params.id;
  console.log('User id', userId);
  try {
    const todos = await Todo.find({ user: userId });
    console.log("These are your todo's", todos);
    if (!todos)
      return res
        .status(400)
        .json({ message: 'No Todos for you..., Add some todo first' });

    res.status(200).json({ message: 'Todos', todos });
  } catch (error) {
    res.status(404).json({ message: 'Todos not found' });
  }
};

module.exports.addTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (title.trim() === '' || description.trim() === '') {
      res.status(404).json({ message: 'Title or Description can not be blank!'});
    } else {
      const todo = await Todo.create({
        title,
        description,
        user: req.user._id,
      });
      if(todo){
        res.status(200).json({ message: 'Todo Added Successfully', todo });
      }else{
        res.status(400).json({ message: 'Failed to add Todo!' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error', error });
  }
};

module.exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  try {
    if (todo) {
      const { title, description } = req.body;
      if (title.trim() === '' || description.trim() === '') {
        res.status(404).json({ message: 'Title or Description can not be blank!'});
      } else {
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        const updatedTodo = await todo.save();
        if (updatedTodo) {
          res.status(200).json({ message: 'Todo updated Successfully', updatedTodo });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error', error });
  }
};

module.exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  try {
    if (todo) {
      const deletedItems = await Todo.findByIdAndRemove(req.params.id);
      if (deletedItems) {
        res.status(200).json({ message: 'Todo Deleted Successfully', deletedItems });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error', error });
  }
};

module.exports.completeTodo = (async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  try {
    if (todo) {
      todo.status = true;
      const updatedTodo = await todo.save();
      if (updatedTodo) {
        return res.status(200).json({ message: 'Todo is completed Successfully', updatedTodo });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error', error });
  }
});

module.exports.incompleteTodo = (async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  try {
    if (todo) {
      todo.status = false;
      const updatedTodo = await todo.save();
      if (updatedTodo) {
        res.status(200).json({ message: 'Todo is incompleted', updatedTodo });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error', error });
  }
});