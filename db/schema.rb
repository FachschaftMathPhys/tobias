# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180501225821) do

  create_table "actions", force: :cascade do |t|
    t.integer "top_id"
    t.integer "meeting_id"
    t.integer "protocol_id"
    t.bigint "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_actions_on_meeting_id"
    t.index ["protocol_id"], name: "index_actions_on_protocol_id"
    t.index ["top_id"], name: "index_actions_on_top_id"
  end

  create_table "attachments", force: :cascade do |t|
    t.string "author"
    t.binary "content"
    t.string "name"
    t.string "attachable_type"
    t.integer "attachable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attachable_type", "attachable_id"], name: "index_attachments_on_attachable_type_and_attachable_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "author"
    t.text "content"
    t.string "title"
    t.string "commentable_type"
    t.integer "commentable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
  end

  create_table "meetings", force: :cascade do |t|
    t.date "date"
    t.datetime "begin"
    t.datetime "end"
    t.string "moderation"
    t.string "clerk"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.string "description"
    t.index ["organization_id"], name: "index_meetings_on_organization_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "protocols", force: :cascade do |t|
    t.text "content"
    t.string "result"
    t.bigint "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tops", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "submitter"
    t.string "author"
    t.string "submitted_at"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_tops_on_organization_id"
  end

end
