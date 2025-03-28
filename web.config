<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <!-- Configuración del manejador iisnode -->
        <handlers>
            <add name="iisnode" path="index.js" verb="*" modules="iisnode" resourceType="File" />
        </handlers>

        <!-- Reglas de reescritura de URL -->
        <rewrite>
            <rules>
                <rule name="ReqToIndex">
                    <match url="/*" />
                    <action type="Rewrite" url="index.js" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>