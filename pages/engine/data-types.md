# Data Types

- Engine type in the one used when defining a table in the DDL.
- JDBC and ODBC types are shown in the table as a reference in case you are planning to create a new driver/client library.

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<tbody>
<tr>
<td style="text-align: left;"><p><b>Engine Type</b></p></td>
<td style="text-align: left;"><p><b>Description</b></p></td>
<td style="text-align: left;"><p><b>JDBC type</b></p></td>
<td style="text-align: left;"><p><b>ODBC type</b></p></td>
</tr>
<tr>
<td style="text-align: left;"><p>string or varchar</p></td>
<td style="text-align: left;"><p>Variable length character string with a
maximum length of 4000.</p></td>
<td style="text-align: left;"><p>VARCHAR</p></td>
<td style="text-align: left;"><p>VARCHAR</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>varbinary</p></td>
<td style="text-align: left;"><p>Variable length binary string with a
nominal maximum length of 8192.</p></td>
<td style="text-align: left;"><p>VARBINARY</p></td>
<td style="text-align: left;"><p>VARBINARY</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>char</p></td>
<td style="text-align: left;"><p>A single 16 bit character - which
cannot represent a value beyond the Basic Multilingual Plane. This
limitation also applies to functions/expressions that expect a single
character such as trim, textagg, texttable, and like escape.</p></td>
<td style="text-align: left;"><p>CHAR</p></td>
<td style="text-align: left;"><p>CHAR</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>boolean</p></td>
<td style="text-align: left;"><p>A single bit, or Boolean, that can be
true, false, or null (unknown)</p></td>
<td style="text-align: left;"><p>BIT</p></td>
<td style="text-align: left;"><p>SMALLINT</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>byte or tinyint</p></td>
<td style="text-align: left;"><p>Numeric, integral type, signed
8-bit</p></td>
<td style="text-align: left;"><p>TINYINT</p></td>
<td style="text-align: left;"><p>SMALLINT</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>short or smallint</p></td>
<td style="text-align: left;"><p>Numeric, integral type, signed
16-bit</p></td>
<td style="text-align: left;"><p>SMALLINT</p></td>
<td style="text-align: left;"><p>SMALLINT</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>integer or serial</p></td>
<td style="text-align: left;"><p>Numeric, integral type, signed 32-bit.
The serial type also implies not null and has an auto-incrementing value
that starts at 1. serial types are not automatically UNIQUE.</p></td>
<td style="text-align: left;"><p>INTEGER</p></td>
<td style="text-align: left;"><p>INTEGER</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>long or bigint</p></td>
<td style="text-align: left;"><p>Numeric, integral type, signed
64-bit</p></td>
<td style="text-align: left;"><p>BIGINT</p></td>
<td style="text-align: left;"><p>NUMERIC</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>biginteger</p></td>
<td style="text-align: left;"><p>Numeric, integral type, arbitrary
precision of up to 1000 digits</p></td>
<td style="text-align: left;"><p>NUMERIC</p></td>
<td style="text-align: left;"><p>NUMERIC</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>float or real</p></td>
<td style="text-align: left;"><p>Numeric, floating point type, 32-bit
IEEE 754 floating-point numbers</p></td>
<td style="text-align: left;"><p>REAL</p></td>
<td style="text-align: left;"><p>FLOAT</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>double</p></td>
<td style="text-align: left;"><p>Numeric, floating point type, 64-bit
IEEE 754 floating-point numbers</p></td>
<td style="text-align: left;"><p>DOUBLE</p></td>
<td style="text-align: left;"><p>DOUBLE</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>bigdecimal or decimal</p></td>
<td style="text-align: left;"><p>Numeric, floating point type, arbitrary
precision of up to 1000 digits.</p></td>
<td style="text-align: left;"><p>NUMERIC</p></td>
<td style="text-align: left;"><p>NUMERIC</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>date</p></td>
<td style="text-align: left;"><p>Datetime, representing a single day
(year, month, day)</p></td>
<td style="text-align: left;"><p>DATE</p></td>
<td style="text-align: left;"><p>DATE</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>time</p></td>
<td style="text-align: left;"><p>Datetime, representing a single time
(hours, minutes, seconds)</p></td>
<td style="text-align: left;"><p>TIME</p></td>
<td style="text-align: left;"><p>TIME</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>timestamp</p></td>
<td style="text-align: left;"><p>Datetime, representing a single date
and time (year, month, day, hours, minutes, seconds, fractional
seconds).</p></td>
<td style="text-align: left;"><p>TIMESTAMP</p></td>
<td style="text-align: left;"><p>TIMESTAMP</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>object</p></td>
<td style="text-align: left;"><p>Any arbitrary serializable object.</p></td>
<td style="text-align: left;"><p>JAVA_OBJECT</p></td>
<td style="text-align: left;"><p>VARCHAR</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>blob</p></td>
<td style="text-align: left;"><p>Binary large object, representing a
stream of bytes.</p></td>
<td style="text-align: left;"><p>BLOB</p></td>
<td style="text-align: left;"><p>VARCHAR</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>clob</p></td>
<td style="text-align: left;"><p>Character large object, representing a
stream of characters.</p></td>
<td style="text-align: left;"><p>CLOB</p></td>
<td style="text-align: left;"><p>VARCHAR</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>xml <i>(kept for compatibility but marked for removal)</i></p></td>
<td style="text-align: left;"><p>XML document</p></td>
<td style="text-align: left;"><p>JAVA_OBJECT</p></td>
<td style="text-align: left;"><p>VARCHAR</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>geometry</p></td>
<td style="text-align: left;"><p>Geospatial Object</p></td>
<td style="text-align: left;"><p>BLOB</p></td>
<td style="text-align: left;"><p>BLOB</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>geography</p></td>
<td style="text-align: left;"><p>Geospatial Object</p></td>
<td style="text-align: left;"><p>BLOB</p></td>
<td style="text-align: left;"><p>BLOB</p></td>
</tr>
<tr>
<td style="text-align: left;"><p>json</p></td>
<td style="text-align: left;"><p>Character large object, representing a
stream of JSON characters.</p></td>
<td style="text-align: left;"><p>CLOB</p></td>
<td style="text-align: left;"><p>VARCHAR</p></td>
</tr>
</tbody>
</table>

## Arrays

An array of any type is designated by adding \[\] for each array
dimension to the type declaration.

### Example:

    string[]

    integer[][]

Array handling is typically in memory. It is not advisable to rely on
the usage of large array values. Arrays of large objects (LOBs) are
typically not handled correctly when serialized.