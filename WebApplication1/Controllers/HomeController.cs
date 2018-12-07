using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void Index(ef.Conta c)
        {
            var funcao = new Banco();
            funcao.Cadastrar(c);

            Index();
        }

        [HttpPost]
        public ActionResult AddAccount(ef.Conta account) {
            var funcao = new Banco();
            string message = string.Format("Account: desc '{0}', date '{1}', value '{2}'.", account.Description, account.Date, account.Value);
            System.Diagnostics.Debug.WriteLine(message);
            funcao.Cadastrar(account);

            //  Send "Success"
            return Json(new { success = true, responseText = "Your message successfuly sent!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateAccount(ef.Conta account)
        {
            var funcao = new Banco();
            funcao.Update(account);

            //  Send "Success"
            return Json(new { success = true, responseText = "Update!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteAccount(ef.Conta account)
        {
            var funcao = new Banco();
            funcao.Delete(account);

            //  Send "Success"
            return Json(new { success = true, responseText = "Deleted!" }, JsonRequestBehavior.AllowGet);
        }

        public string SearchAccount()
        {
            var bd = new Banco();
            var contas = bd.Consultar();
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(contas);
            return json;
        }
    }
}