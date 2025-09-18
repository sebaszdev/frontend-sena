using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using pagina_c_.Models;

namespace pagina_c_.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Catalog()
    {
        return View();
    }

    public IActionResult Cart()
    {
        return View();
    }

    public IActionResult About()
    {
        return View();
    }

    public IActionResult Inventory()
    {
        return View();
    }

    public IActionResult Login()
    {
        return View();
    }

    public IActionResult Register()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
