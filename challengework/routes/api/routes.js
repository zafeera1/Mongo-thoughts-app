
// Users Routes
// POST /api/users
app.post('/api/users', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // PUT /api/users/:userId
  app.put('/api/users/:userId', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE /api/users/:userId
  app.delete('/api/users/:userId', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Bonus: Remove user's associated thoughts
      await Thought.deleteMany({ username: deletedUser.username });
      res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // Thoughts Routes
  // POST /api/thoughts
  app.post('/api/thoughts', async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      // Push created thought's _id to the associated user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // PUT /api/thoughts/:thoughtId
  app.put('/api/thoughts/:thoughtId', async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE /api/thoughts/:thoughtId
  app.delete('/api/thoughts/:thoughtId', async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  