using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ef;

namespace WebApplication1.Models
{
    public class Banco
    {
        public Conta[] Consultar()
        {
            var db = new Cadastro();
            var result = db.Contas.SqlQuery("SELECT * FROM conta").ToArray();
            return result;
        }

        public void Cadastrar(Conta c)
        {
            var db = new Cadastro();
            var conta = db.Contas.Create();
            conta.Description = c.Description;
            conta.Value = c.Value;
            conta.Date = c.Date;
            db.Contas.Add(conta);
            db.SaveChanges();
        }

        public void Update(Conta c)
        {
            var db = new Cadastro();
            db.Entry(c).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void Delete(Conta c)
        {
            System.Diagnostics.Debug.WriteLine(c.Id);
            System.Diagnostics.Debug.WriteLine(c.Description);
            System.Diagnostics.Debug.WriteLine(c.Value);
            System.Diagnostics.Debug.WriteLine(c.Date);

            var db = new Cadastro();
            //var conta = db.Contas.Remove(c);

            db.Contas.Attach(c);
            db.Entry(c).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
    }
}