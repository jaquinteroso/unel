class BackfillLabelTypes < ActiveRecord::Migration[8.1]
  def up
    execute <<~SQL.squish
      UPDATE supplies
      SET label_type = CASE
        WHEN LOWER(COALESCE(size_description, '')) LIKE '%frontal%' THEN 'front'
        WHEN LOWER(COALESCE(size_description, '')) LIKE '%lateral%' THEN 'side'
        WHEN LOWER(COALESCE(size_description, '')) LIKE '%tapa%' THEN 'lid'
        WHEN LOWER(COALESCE(size_description, '')) LIKE '%qr%' THEN 'qr'
        ELSE 'other'
      END
      WHERE category = 'label' AND label_type IS NULL
    SQL
  end

  def down
  end
end
