# Redis

Redis（Remote Dictionary Server）是一个使用 C 语言编写的开源、高性能、非关系型的 Key-Value 型内存数据库，由 Salvatore Sanfilippo 开发。Redis 不同于传统的磁盘关系型数据库，它通过将全部数据存储在内存中，而非磁盘上，快速地存取数据。Redis 同时提供了多种数据结构，包括字符串（String）、哈希（Hash）、列表（List）、集合（Set）和有序集合（Sorted Set）等，且支持事务、持久化和复制等功能，因而成为目前最热门的 NoSQL 解决方案之一。

## Redis 的特点

- 高性能：由于 Redis 的所有数据都存储在内存中，它能够实现非常高的读写性能，读性能超过 100k+/s，写性能在 80k+/s。
- 丰富的数据结构：Redis 内置支持常见的数据结构，例如字符串、哈希、列表、集合和有序集合等。这些丰富的数据结构能够满足很多业务场景的需求。
- 持久化支持：Redis 支持数据的持久化，数据写入 Redis 后会被异步地写入硬盘，当 Redis 重启后，可以从硬盘将数据恢复回内存中。
- 高可用性：Redis 可以配置为主从模式来提高可用性，主节点主要用于写入，从节点则用于读取，在主节点损坏之后，从节点会自动接替主节点的功能。另外，Redis 还提供了哨兵模式，它能够在主从切换时，自动切换客户端的连接，确保在主从切换过程中的数据不丢失。
- 支持事务：在 Redis 中，可以通过 MULTI，EXEC 等命令来支持事务操作，执行的多个命令要么全部执行成功，要么全部执行失败。

## Redis 的应用场景

因为 Redis 的高性能和多种数据结构，它在多个场景中被广泛使用。

1.  缓存：Redis 最常用的场景是作为缓存服务器。在应用程序和数据库之间增加一个 Redis 缓存服务器，能够大大提高读取性能，降低应用程序和数据库之间的负载。

2.  分布式锁：Redis 可以很方便地实现分布式锁，对集群中的资源或数据进行加锁和解锁操作。

3.  计数器：Redis 的计数器功能非常出色。通过执行 INCR 命令，就能够方便地实现计数器的功能，例如记录网站浏览数量、商品销售数量等。

4.  消息队列：Redis 的 LIST、PUSH、POP 等命令，能够非常方便地实现简单的队列功能。

总之，Redis 在高性能、多数据结构、高可用性、事务性等方面都有很好的表现，加上其开源的特性，使得 Redis 在互联网中广受欢迎。
