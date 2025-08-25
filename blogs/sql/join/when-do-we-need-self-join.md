---
title: 'When do we need a Self JOIN?'
date: '2025-08-19'
description: 'It is a very simple SQL concept but heavily used. Usually, we use it with one joining / matching condition, but sometimes there can be multiple conditions depending on the scenar'
cover_image: '/images/blogs/sql/join/when-do-we-need-self-join.png'
categories:
  - sql
  - data analysis
---

![When do we need a Self JOIN?](/images/blogs/sql/join/when-do-we-need-self-join.png 'When do we need a Self JOIN?')


# 🚀 Let’s talk about a very simple SQL concept but heavily used — 𝗦𝗲𝗹𝗳 𝗝𝗢𝗜𝗡.
Usually, we use it with one joining / matching condition, but sometimes there can be multiple conditions depending on the scenario.

🤔 When do we need a Self JOIN?
We use it when we want to 𝗰𝗼𝗺𝗽𝗮𝗿𝗲 𝗿𝗼𝘄𝘀 𝘄𝗶𝘁𝗵𝗶𝗻 𝘁𝗵𝗲 𝘀𝗮𝗺𝗲 𝘁𝗮𝗯𝗹𝗲.

For example:  
- Finding employees who share the same manager.  
- Comparing product prices to find cheaper or more expensive alternatives.  
- Detecting duplicate values in a dataset.  

> 

This is particularly useful for:
1. **Hierarchical Data**: For example, employees and their managers, or categories and subcategories. It's kind of parent-child relationship exploration.
2. **Comparing Rows within the Same Table**: For example, finding customers who live in the same city, or identifying duplicate records based on certain criteria.
3. **Analyzing Sequential Data**: Where the current record's value depends on a previous record's value, such as calculating the difference between a current day's sales and the previous day's sales within a single sales table.

Let's see a SQL problem from **Leetcode** — 197. Rising Temperature.

### Problem Statement - 1

```
Table: Weather

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| recordDate    | date    |
| temperature   | int     |
+---------------+---------+
id is the column with unique values for this table.
There are no different rows with the same recordDate.
This table contains information about the temperature on a certain day.
 

Write a solution to find all dates' id with higher temperatures compared to
its previous dates (yesterday).

Return the result table in any order.
```

💡 The solution will be like this —

```
SELECT 
  w2.id
FROM 
  Weather w1 
  JOIN weather w2
    ON (w1.recordDate = w2.recordDate - INTERVAL '1 day')
WHERE w2.temperature > w1.temperature;
```

Let's see an another SQL problem from **Leetcode** — 181. Employees Earning More Than Their Managers.

### Problem Statement - 2

```
Table: Employee

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table indicates the ID of an employee, their name, 
salary, and the ID of their manager.
 

Write a solution to find the employees who earn more than their managers.

Return the result table in any order.
```

💡 The solution will be like this —

<img src="/images/blogs/sql/join/181-employees-earning-more-than-their-managers.png" style="display:block; margin:auto; margin-bottom:20px;" width="800" height="500" alt="https-connection-is-secure">

```
SELECT 
  e.name
FROM 
  Employee e
  JOIN Employee m
    ON (e.managerId=m.id)
WHERE e.salary > m.salary
```