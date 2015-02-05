using System;
using log4net;
using log4net.Ext;

namespace demo
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			ILog log = LogManager.GetLogger (System.Reflection.MethodBase.GetCurrentMethod().Name);
			log.Info (".Net Info");

			log.Debug ("Bubbles from .Net");
		}
	}
}