class StandardEmailMailer < ApplicationMailer
  default from: "no-reply@mathphys.stura.uni-heidelberg.de"
  def send_email(email)
    @email = email
    mail(to: @email[:address], subject: @email[:subject])
  end
end