class CreateClinics < ActiveRecord::Migration
  def change
    create_table :clinics do |t|
      t.string :name
      t.string :full_address
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.decimal :lat
      t.decimal :lng, :precision=>10, :scale=>7

      t.string :clinic_type

      t.timestamps(null:false)
    end
  end
end
