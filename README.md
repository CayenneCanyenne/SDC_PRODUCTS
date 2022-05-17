# Backend API for Products

## Tech Stack
- [node](https://nodejs.org/en/)
- [express](http://expressjs.com/)
- [postgreSQL](https://www.postgresql.org/)
- [node-postgres](https://node-postgres.com/)
- [artillery](https://www.artillery.io/docs)
- [AWS EC2](https://aws.amazon.com/)
- [nginx](https://www.nginx.com/)

## Overview
A micro-service developed to update an existing API for web-scale traffic damand

## API Design and Implemenation
-	Database Selection: provided dataset was relational and suitable for an RBDMS and selected the open-source option PostgreSQL with consideration to cost and reliability
-	Construct database schema: pgAdmin was used to extract, transform, and load data into photos, skus, features, and related tables
-	Implementation: Service Logic used the MVC design pattern to implement service logic giving the client
-	Optimization: identify and aleviate local and server related bottlenecks (see below)

## Optimization - A Phased Approach
- Pre-depolyment: conduct performance test local with artillery.io refactor database queries and index (B-tree) field values shared between tables
- Deployment: deployed servers on AWS EC2 and load balance with nginx

## Results



