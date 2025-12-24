/*
  # Products and Categories Schema

  ## Overview
  Creates the database schema for a wholesale promotional apparel system with products organized by categories.

  ## New Tables
  
  ### `categories`
  - `id` (uuid, primary key) - Unique identifier for each category
  - `name` (text, unique, not null) - Category name (e.g., "T-Shirts", "Caps")
  - `slug` (text, unique, not null) - URL-friendly version of the name
  - `description` (text) - Description of the category
  - `icon_name` (text, not null) - Name of the Lucide icon to display
  - `display_order` (integer, not null) - Order in which categories should appear
  - `created_at` (timestamptz) - Timestamp when category was created
  
  ### `products`
  - `id` (uuid, primary key) - Unique identifier for each product
  - `category_id` (uuid, foreign key) - Reference to categories table
  - `name` (text, not null) - Product name
  - `description` (text) - Product description
  - `price` (numeric, not null) - Product price
  - `image_url` (text) - URL to product image
  - `stock` (integer, default 0) - Available stock quantity
  - `sku` (text, unique) - Stock keeping unit identifier
  - `is_featured` (boolean, default false) - Whether product is featured
  - `created_at` (timestamptz) - Timestamp when product was created
  - `updated_at` (timestamptz) - Timestamp when product was last updated

  ## Security
  - Enable RLS on both tables
  - Add policies for public read access (products are publicly viewable)
  - Future: Add admin policies for write access
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon_name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  image_url text,
  stock integer DEFAULT 0 CHECK (stock >= 0),
  sku text UNIQUE,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);
