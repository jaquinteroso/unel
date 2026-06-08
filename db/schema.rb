# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_08_000700) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.datetime "updated_at", null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "ingredients", force: :cascade do |t|
    t.integer "cost_per_unit"
    t.datetime "created_at", null: false
    t.string "name"
    t.string "unit_measure"
    t.datetime "updated_at", null: false
  end

  create_table "product_supplies", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "product_id", null: false
    t.decimal "quantity", default: "1.0", null: false
    t.string "role", null: false
    t.bigint "supply_id", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "supply_id"], name: "index_product_supplies_on_product_id_and_supply_id", unique: true
    t.index ["product_id"], name: "index_product_supplies_on_product_id"
    t.index ["supply_id"], name: "index_product_supplies_on_supply_id"
  end

  create_table "products", force: :cascade do |t|
    t.integer "cost"
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "margin"
    t.string "name"
    t.integer "price"
    t.integer "stock"
    t.datetime "updated_at", null: false
  end

  create_table "recipe_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "ingredient_id", null: false
    t.bigint "product_id", null: false
    t.decimal "quantity"
    t.string "quantity_unit"
    t.datetime "updated_at", null: false
    t.index ["ingredient_id"], name: "index_recipe_items_on_ingredient_id"
    t.index ["product_id"], name: "index_recipe_items_on_product_id"
  end

  create_table "supplies", force: :cascade do |t|
    t.string "category", null: false
    t.integer "cost_per_unit", default: 0, null: false
    t.datetime "created_at", null: false
    t.string "label_type"
    t.string "name", null: false
    t.integer "pack_quantity"
    t.string "size_description"
    t.string "size_unit"
    t.integer "size_value"
    t.string "unit_measure", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_supplies_on_category"
    t.index ["label_type"], name: "index_supplies_on_label_type"
    t.index ["name", "category"], name: "index_supplies_on_name_and_category", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "product_supplies", "products"
  add_foreign_key "product_supplies", "supplies"
  add_foreign_key "recipe_items", "ingredients"
  add_foreign_key "recipe_items", "products"
end
