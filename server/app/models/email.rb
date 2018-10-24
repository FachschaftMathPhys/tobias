class Email < ApplicationRecord
  belongs_to :referencable, polymorphic: true, optional: true
  after_save :send_mail
  def send_mail
    #Sending an emails
    puts self
    puts "Hallo"
    mail= {body: self.body, address: self.address, subject: self.subject}
    puts mail
    StandardEmailMailer.send_email(mail).deliver
    "OK"
  end
end
