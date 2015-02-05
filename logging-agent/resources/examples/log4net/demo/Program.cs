using System;
using log4net;

namespace demo
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			ILog log = LogManager.GetLogger ("my-logger-name");
			log.Info ("yada");
		}
	}
}
