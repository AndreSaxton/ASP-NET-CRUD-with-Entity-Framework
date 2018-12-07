namespace ef
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.Linq;

    public class Cadastro : DbContext
    {
        // Your context has been configured to use a 'Cadastro' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'ef.Cadastro' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'Cadastro' 
        // connection string in the application configuration file.
        public Cadastro()
            : base("name=Cadastro2")
            //: base("name=localhost")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }

        public virtual DbSet<Conta> Contas { get; set; }
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}

    [Table("conta")]
    public class Conta
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
        public float Value { get; set; }

        /*public int Id { get => id; set => id = value; }
        public string Description { get => description; set => description = value; }
        public DateTime? Date { get => date; set => date = value; }
        public float Value { get => value; set => this.value = value; }*/
    }

    public class Test
    {
        public System.Collections.Generic.List<Conta> Conta { get; set; }
    }
}