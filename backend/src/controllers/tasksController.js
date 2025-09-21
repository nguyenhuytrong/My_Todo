export const getAllTasks = (request, response) => {
    response.status(200).send("You have 20 requested tasks");
};

export const createTasks = (req,res) => {
    res.status(201).json({message: "Task created successfully" });
};

export const updateTasks = (req,res) => {
    res.status(200).json({message: "Task updated successfully" });
};

export const deleteTasks = (req,res) => {
    res.status(200).json({message: "Task deleted successfully" });
};
