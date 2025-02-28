'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Task {
  id: number;
  category: string;
  item: string;
  selected: boolean;
}

const TaskForm = () => {
  const supabase = createClientComponentClient();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [customCategory, setCustomCategory] = useState('');
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const defaultTasks = [
    { category: 'ELECTRICAL', items: ['ceiling fans & lights', 'switches & outlets', 'smoke detectors'] },
    { category: 'PLUMBING', items: ['sinks & faucets', 'floats & valves', 'toilets & wax rings'] },
    { category: 'MOUNTING', items: ['tv & sound system', 'shelving', 'art & mirrors', 'hand & shower rails'] },
    { category: 'PRESSURE WASH', items: ['residential', 'commercial', 'auto & RV', 'boat & dock'] },
    { category: 'ASSEMBLY', items: ['office pieces', 'furniture', 'trampolines', 'sports equiptment', 'playscapes'] },
    { category: 'HAULING', items: ['help moving', 'pickups', 'deliveries', 'hot shot'] },
    { category: 'CLEANING', items: ['construction', 'make ready (rentals)', 'home & auto'] },
    { category: 'HOME REPAIRS', items: ['flashing & trim', 'drywall patching', 'calking & grout', 'door locks & frame'] },
    { category: 'WELDING', items: ['fence repairs', 'railing repairs', 'gate repairs'] },
    { category: 'AUTOMOTIVE', items: ['tune ups', 'tire , battery & lights', 'simple repairs'] },
    { category: 'LANDSCAPING', items: ['cuts, edge & clean', 'mulching & weeding', 'clearing & de-stump'] },
    { category: 'DEMOLITION', items: ['bathrooms', 'kitchens', 'decks & stairs'] },
  ];

  useEffect(() => {
    const initialTasks: Task[] = defaultTasks.flatMap((category) =>
      category.items.map((item, index) => ({
        id: Math.random(),
        category: category.category,
        item: item,
        selected: false,
      }))
    );
    setTasks(initialTasks);
  }, []);

  const handleToggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const handleAddItem = () => {
    if (newItem && customCategory) {
      setCustomItems([...customItems, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setCustomItems(customItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTasks = tasks.filter((task) => task.selected);

    if (customCategory && customItems.length > 0) {
      const customTaskObjs = customItems.map(item => ({
        category: customCategory,
        item: item,
        selected: true,
      }));
      selectedTasks.push(...customTaskObjs);
    }

    const { error } = await supabase.from('user_tasks').insert(
      selectedTasks.map((task) => ({
        category: task.category,
        item: task.item,
      }))
    );

    if (error) {
      console.error('Error saving tasks:', error);
    } else {
      console.log('Tasks saved successfully');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {defaultTasks.map((category) => (
          <Card key={category.category} className="mb-3">
            <Card.Header>{category.category}</Card.Header>
            <ListGroup variant="flush">
              {category.items.map((item) => (
                <ListGroup.Item key={item}>
                  <Form.Check
                    type="checkbox"
                    label={item}
                    checked={tasks.find((task) => task.category === category.category && task.item === item)?.selected || false}
                    onChange={() => handleToggleTask(tasks.find((task) => task.category === category.category && task.item === item)?.id || 0)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ))}

        <Card className="mb-3">
          <Card.Header>Custom Category</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Category Name"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </Form.Group>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Add Item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={handleAddItem}>
                Add
              </Button>
            </InputGroup>
            <ListGroup>
              {customItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item}
                  <Button variant="outline-danger" size="sm" className="float-end" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <Button variant="primary" type="submit">
          Save Tasks
        </Button>
      </Form>
    </Container>
  );
};

export default TaskForm;